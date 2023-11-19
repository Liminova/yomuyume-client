import MyOffscreenCanvas from "../utils/MyOffscreenCanvas";
import { saveToCache, getFromCache } from "../utils/cacheOperations";

interface MyMessageData {
	width: number;
	height: number;
	blurhash: string;
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

async function processQueue() {
	if (activeWorkers < MAX_WORKERS && queue.length > 0) {
		activeWorkers++;
		const job = queue.shift();

		if (!job) {
			return;
		}

		const { width, height, blurhash, maxAge } = job.data;

		const cache = await getFromCache(blurhash);

		if (cache !== "") {
			job.port.postMessage(cache);
			activeWorkers--;
			await processQueue();
			return;
		}

		const rendered = await new MyOffscreenCanvas(width, height)
			.fromBlurhash(blurhash)
			.convertToBase64();

		await saveToCache(blurhash, rendered, maxAge);
		job.port.postMessage(rendered);

		activeWorkers--;
		await processQueue();
	}
}
