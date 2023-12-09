import avifDec from "../../../assets/avif_dec";
import jxlDec from "../../../assets/jxl_dec";
import { MAX_POLYFILL_WORKERS as MAX_WORKERS } from "../../../utils/variables/store";
import { saveToCache, getFromCache } from "../cacheOperations";
import MyOffscreenCanvas from "../classes/MyOffscreenCanvas";
import dataToBlobURL from "../dataToBlobURL";

type MyMessageData = [string, string]; /** src, format */

const queue: Array<{ data: MyMessageData; port: MessagePort }> = [];
let activeWorkers = 0;

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
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
			return jxlDec();
		case "avif":
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
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

		const [src, format] = job.data;

		if (!src || !format) {
			activeWorkers--;
			await processQueue();
			return;
		}

		/** Fetch from cache first */
		const cached = await getFromCache(src);

		if (cached !== "") {
			job.port.postMessage(await dataToBlobURL(cached));
			activeWorkers--;
			await processQueue();
			return;
		}

		/** Fetch image from network */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		const decoder = await getDecoder(format);
		const fetchedImage = await fetch(src);

		if (!fetchedImage.ok) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		const decoded: ImageData = decoder.decode(await fetchedImage.arrayBuffer());

		const canvas = new MyOffscreenCanvas(decoded.width, decoded.height).fromImageData(decoded);

		await saveToCache(src, await canvas.convertToBase64());

		job.port.postMessage(await canvas.convertToBlobURL());

		activeWorkers--;
		await processQueue();
	}
}
