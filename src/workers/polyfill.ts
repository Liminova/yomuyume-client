// eslint-disable-next-line import/no-absolute-path
import avifDec from "/avif_dec.js?url";
// eslint-disable-next-line import/no-absolute-path
import jxlDec from "/jxl_dec.js?url";
import MyOffscreenCanvas from "../utils/MyOffscreenCanvas";
import { saveToCache, getFromCache } from "../utils/cacheOperations";

interface MyMessageData {
	format: string;
	path: string;
	maxAge: number;
}

const queue: Array<{ data: MyMessageData; port: MessagePort }> = [];
let activeWorkers = 0;
const MAX_WORKERS = navigator.hardwareConcurrency || 4;

// @ts-expect-error - self is a SharedWorkerGlobalScope
self.onconnect = (event: MessageEvent<MyMessageData>) => {
	const port = event.ports[0];

	port.onmessage = async (event: MessageEvent<MyMessageData>) => {
		queue.push({ data: event.data, port });
		await processQueue();
	};
};

function getDecoder(format: string) {
	switch (format) {
		case "jxl":
			// @ts-expect-error - jxlDec is a function, because we use ?url in the import
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return jxlDec();
		case "avif":
			// @ts-expect-error - same as above
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return avifDec();
		default:
			throw new Error("Unknown format for worker-polyfill.js");
	}
}

async function processQueue() {
	if (activeWorkers < MAX_WORKERS && queue.length > 0) {
		activeWorkers++;
		const job = queue.shift();

		if (!job) {
			return;
		}

		/** Fetch from cache first */
		const cached = await getFromCache(job.data.path);

		if (cached !== "") {
			job.port.postMessage(cached);
			activeWorkers--;
			await processQueue();
			return;
		}

		/** Fetch image from network */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		const module = await getDecoder(job.data.format);
		const image = await fetch(job.data.path);

		if (!image.ok) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		const imageData: ImageData = module.decode(await image.arrayBuffer());

		/** Place into canvas */
		const canvas = new MyOffscreenCanvas(imageData.width, imageData.height).fromImageData(
			imageData
		);

		/** Save to cache */
		await saveToCache(job.data.path, await canvas.convertToBase64(), job.data.maxAge);

		/** Send blob url to main thread */
		job.port.postMessage(await canvas.convertToBlobURL());

		activeWorkers--;
		await processQueue();
	}
}
