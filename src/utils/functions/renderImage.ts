import { isAvifSupported, isJxlSupported } from "./isFormatSupported";
import { MAX_WORKERS } from "../variables/store";
import type MyImage from "../types/MyImage";
import type { Ref } from "vue";

type blurhashQueueType = {
	data: {
		blurhash: string;
		width: number;
		height: number;
	};
	renderedDataRef: Ref<string>;
}

type imageQueueType = {
	data: {
		src: string;
		format: string;
	};
	renderedDataRef: Ref<string>;
}

async function doNeedPolyfill(image: MyImage) {
	const doNeedPolyfillAvif = image.format === "avif" && !(await isAvifSupported());
	const doNeedPolyfillJxl = image.format === "jxl" && !(await isJxlSupported());

	return doNeedPolyfillAvif || doNeedPolyfillJxl;
}

abstract class RendererBase {
	abstract newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedActualImageRef: Ref<string>,
		isNative: Ref<boolean>
	): Promise<void>;
}

class WebWorkerRenderer implements RendererBase {
	blurhashQueue: Array<blurhashQueueType> = [];
	imageQueue: Array<imageQueueType> = [];

	private readonly blurhashWorkers: Array<{ instance: Worker; isReady: boolean }> = [];
	private readonly imageWorkers: Array<{ instance: Worker; isReady: boolean }> = [];

	constructor() {
		this.blurhashWorkers = Array.from({ length: MAX_WORKERS }, () => ({
			instance: new Worker(new URL("../../workers/blurhash.web.ts", import.meta.url), {
				type: "module",
				name: "blurhashRenderer",
			}),
			isReady: true,
		}));

		this.imageWorkers = Array.from({ length: MAX_WORKERS }, () => ({
			instance: new Worker(new URL("../../workers/actualImage.web.ts", import.meta.url), {
				type: "module",
				name: "actualImageRenderer",
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

	async newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedActualImageRef: Ref<string>
	) {
		this.blurhashQueue.push({
			data: {
				blurhash: image.blurhash,
				width: image.width,
				height: image.height,
			},
			renderedDataRef: renderedBlurhashRef,
		});
		this.processQueue(this.blurhashQueue, this.blurhashWorkers);

		if (await doNeedPolyfill(image)) {
			this.imageQueue.push({
				data: {
					src: image.src,
					format: image.format,
				},
				renderedDataRef: renderedActualImageRef,
			});
			this.processQueue(this.imageQueue, this.imageWorkers);
		} else {
			renderedActualImageRef.value = image.src;
		}
	}
}

class SharedWorkerRenderer implements RendererBase {
	async newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedActualImageRef: Ref<string>
	) {
		const blurhashWorker = new SharedWorker(
			new URL("../../workers/blurhash.shared.ts", import.meta.url),
			{
				type: "module",
				name: "blurhashRenderer",
			}
		);

		blurhashWorker.port.onmessage = (event: MessageEvent<string>) => {
			renderedBlurhashRef.value = event.data;
		};

		blurhashWorker.port.postMessage({
			blurhash: image.blurhash,
			width: image.width,
			height: image.height,
		});

		if (await doNeedPolyfill(image)) {
			const actualImageWorker = new SharedWorker(
				new URL("../../workers/actualImage.shared.ts", import.meta.url),
				{
					type: "module",
					name: "actualImageRenderer",
				}
			);

			actualImageWorker.port.onmessage = (event: MessageEvent<string>) => {
				renderedActualImageRef.value = event.data;
			};

			actualImageWorker.port.postMessage({
				src: image.src,
				format: image.format,
			});
		} else {
			renderedActualImageRef.value = image.src;
		}
	}
}

/**
 * Renders the blurhash and the actual image using Shared/Web Workers.
 *
 * @param image a MyImage object
 * @param renderedBlurhashRef the ref to store the rendered blurhash
 * @param renderedImageRef the ref to store the rendered actual image
 */
export default async function renderImage(
	image: MyImage,
	renderedBlurhashRef: Ref<string>,
	renderedImageRef: Ref<string>
) {
	const renderer =
		"SharedWorker" in window ? new SharedWorkerRenderer() : new WebWorkerRenderer();

	await renderer.newJob(image, renderedBlurhashRef, renderedImageRef);
}
