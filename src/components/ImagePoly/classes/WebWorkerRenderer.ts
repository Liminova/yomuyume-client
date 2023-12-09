import { MAX_POLYFILL_WORKERS, MAX_BLURHASH_WORKERS } from "../../../utils/variables/store";
import type MyImage from "../../../utils/types/MyImage";
import type { Renderer } from "./RendererInterface";
import type { Ref } from "vue";

type blurhashQueueType = {
	data: [string, number, number] /** blurhash, width, height */;
	renderedDataRef: Ref<string>;
};

type imageQueueType = {
	data: [string, string] /** src, format */;
	renderedDataRef: Ref<string>;
};

export default class WebWorkerRenderer implements Renderer {
	private readonly blurhashQueue: Array<blurhashQueueType> = [];
	private readonly imageQueue: Array<imageQueueType> = [];
	private polyfillWorkersSpunUp = false;

	private readonly blurhashWorkers: Array<{ instance: Worker; isReady: boolean }> = [];
	private imageWorkers: Array<{ instance: Worker; isReady: boolean }> = [];

	constructor() {
		this.blurhashWorkers = Array.from({ length: MAX_BLURHASH_WORKERS }, () => ({
			instance: new Worker(new URL("../workers/blurhash.web.ts", import.meta.url), {
				type: "module",
				name: "blurhashRenderer",
			}),
			isReady: true,
		}));
	}

	private spinUpPolyfillWorkers() {
		this.polyfillWorkersSpunUp = true;
		this.imageWorkers = Array.from({ length: MAX_POLYFILL_WORKERS }, () => ({
			instance: new Worker(new URL("../workers/actualImage.web.ts", import.meta.url), {
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

	newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedImageRef: Ref<string>,
		isNative: boolean
	) {
		this.blurhashQueue.push({
			data: [image.blurhash, image.width, image.height],
			renderedDataRef: renderedBlurhashRef,
		});
		this.processQueue(this.blurhashQueue, this.blurhashWorkers);

		if (isNative) {
			renderedImageRef.value = image.src;
			return;
		}

		if (!this.polyfillWorkersSpunUp) {
			this.spinUpPolyfillWorkers();
		}

		this.imageQueue.push({
			data: [image.src, image.format],
			renderedDataRef: renderedImageRef,
		});
		this.processQueue(this.imageQueue, this.imageWorkers);
	}
}
