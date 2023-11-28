import { MAX_WORKERS } from "../../../utils/variables/store";
import doNeedPolyfill from "../doNeedPolyfill";
import type MyImage from "../../../utils/types/MyImage";
import type RendererBase from "./RendererBase";
import type { Ref } from "vue";

type blurhashQueueType = {
	data: {
		blurhash: string;
		width: number;
		height: number;
	};
	renderedDataRef: Ref<string>;
};

type imageQueueType = {
	data: {
		src: string;
		format: string;
	};
	renderedDataRef: Ref<string>;
};

export default class WebWorkerRenderer implements RendererBase {
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
