import { saveToCache, getFromCache } from "../components/ImagePoly/cacheOperations";
import MyOffscreenCanvas from "../components/ImagePoly/classes/MyOffscreenCanvas";
import dataToBlobURL from "../components/ImagePoly/dataToBlobURL";
import { MAX_WORKERS } from "../utils/variables/store";

interface MyMessageData {
	blurhash: string;
	width: number;
	height: number;
}

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

async function processQueue() {
	if (activeWorkers < MAX_WORKERS && queue.length > 0) {
		activeWorkers++;
		const job = queue.shift();

		if (!job) {
			return;
		}

		const { blurhash, width, height } = job.data;

		if (!blurhash || !width || !height) {
			activeWorkers--;
			await processQueue();
			return;
		}

		const cache = await getFromCache(blurhash);

		if (cache !== "") {
			job.port.postMessage(await dataToBlobURL(cache));
			activeWorkers--;
			await processQueue();
			return;
		}

		const canvas = new MyOffscreenCanvas(width, height).fromBlurhash(blurhash);

		await saveToCache(blurhash, await canvas.convertToBase64());
		job.port.postMessage(await canvas.convertToBase64());

		activeWorkers--;
		await processQueue();
	}
}
