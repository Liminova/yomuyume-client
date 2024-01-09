import { isAvifSupported, isJxlSupported } from "./isFormatSupported";
import { BLURHASH_WORKER_COUNT, IMAGE_WORKER_COUNT } from "./workerCount";
import type MyImage from "../../utils/types/MyImage";
import type { Ref } from "vue";

type blurhashQueueType = {
	data: [string, number, number] /** blurhash, width, height */;
	renderedDataRef: Ref<string>;
};

type imageQueueType = {
	data: [string, string, string] /** src, format, jwt token */;
	renderedDataRef: Ref<string>;
};

async function getFormat(imageUrl: string): Promise<string> {
	if (imageUrl === "") {
		return Promise.resolve("");
	}

	const response = await fetch(imageUrl, {
		method: "HEAD",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	const contentType = response.headers.get("content-type");

	return contentType ? contentType.split("/")[1] : "";
}

async function isNative(format: string): Promise<boolean> {
	switch (format) {
		case "jxl":
			return Promise.resolve(isJxlSupported);
		case "avif":
			return Promise.resolve(isAvifSupported);
		default:
			return Promise.resolve(true);
	}
}

class WebWorkerRenderer {
	private readonly blurhashQueue: Array<blurhashQueueType> = [];
	private readonly imageQueue: Array<imageQueueType> = [];

	private readonly blurhashWorkers: Array<{ instance: Worker; isReady: boolean }> = [];
	private imageWorkers: Array<{ instance: Worker; isReady: boolean }> = [];

	private polyfillWorkersSpunUp = false;

	constructor() {
		this.blurhashWorkers = Array.from({ length: BLURHASH_WORKER_COUNT }, () => ({
			instance: new Worker(new URL("./workers/blurhash.web.ts", import.meta.url), {
				type: "module",
				name: "blurhashRenderer",
			}),
			isReady: true,
		}));
	}

	private spinUpPolyfillWorkers() {
		this.polyfillWorkersSpunUp = true;
		this.imageWorkers = Array.from({ length: IMAGE_WORKER_COUNT }, () => ({
			instance: new Worker(new URL("./workers/image.web.ts", import.meta.url), {
				type: "module",
				name: "imageRenderer",
			}),
			isReady: true,
		}));
	}

	private processQueue(
		queue: Array<blurhashQueueType | imageQueueType>,
		workers: Array<{ instance: Worker; isReady: boolean }>
	) {
		const freeWorker = workers.find((worker) => worker.isReady);

		if (freeWorker && queue.length > 0) {
			const job = queue.shift();

			if (!job) {
				return;
			}

			freeWorker.isReady = false;
			freeWorker.instance.onmessage = (event: MessageEvent<string>) => {
				job.renderedDataRef.value = event.data;
				freeWorker.isReady = true;
				this.processQueue(queue, workers);
			};

			freeWorker.instance.postMessage(job.data);
		}
	}

	async new(image: MyImage, blurhashRef: Ref<string>, imageRef: Ref<string>) {
		this.blurhashQueue.push({
			data: [image.blurhash, image.width, image.height],
			renderedDataRef: blurhashRef,
		});
		this.processQueue(this.blurhashQueue, this.blurhashWorkers);

		const format = await getFormat(image.src);

		if (await isNative(format)) {
			imageRef.value = image.src;
			return;
		}

		if (!this.polyfillWorkersSpunUp) {
			this.spinUpPolyfillWorkers();
		}

		this.imageQueue.push({
			data: [image.src, format, localStorage.getItem("token") ?? ""],
			renderedDataRef: imageRef,
		});
		this.processQueue(this.imageQueue, this.imageWorkers);
	}
}

class SharedWorkerRenderer {
	async new(image: MyImage, blurhashRef: Ref<string>, imageRef: Ref<string>) {
		const blurhashWorker = new SharedWorker(
			new URL("./workers/blurhash.shared.ts", import.meta.url),
			{
				type: "module",
				name: "blurhashRenderer",
			}
		);

		blurhashWorker.port.onmessage = (event: MessageEvent<string>) =>
			(blurhashRef.value = event.data);
		blurhashWorker.port.postMessage([image.blurhash, image.width, image.height]);

		if (await isNative(image.src)) {
			imageRef.value = image.src;
			return;
		}

		const imageWorker = new SharedWorker(
			new URL("./workers/image.shared.ts", import.meta.url),
			{
				type: "module",
				name: "imageRenderer",
			}
		);

		imageWorker.port.onmessage = (event: MessageEvent<string>) => (image.src = event.data);
		imageWorker.port.postMessage(image.src);
	}
}

const renderer = "SharedWorker" in window ? new SharedWorkerRenderer() : new WebWorkerRenderer();

/**
 * Renders the blurhash and the actual image using Shared/Web Workers.
 *
 * @param image a MyImage object
 * @param blurhashRef the ref to store the rendered blurhash
 */
export default function renderImage(
	image: MyImage,
	blurhashRef: Ref<string>,
	imageRef: Ref<string>
) {
	void renderer.new(image, blurhashRef, imageRef);
}
