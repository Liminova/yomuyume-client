import { saveToCache, getFromCache } from "../cacheOperations";
import MyOffscreenCanvas from "../classes/MyOffscreenCanvas";
import dataToBlobURL from "../dataToBlobURL";

type MyMessageData = {
	blurhash: string;
	width: number;
	height: number;
};

self.onmessage = async (event: MessageEvent<MyMessageData>) => {
	const { blurhash, width, height } = event.data;

	if (!blurhash || !width || !height) {
		return;
	}

	const cache = await getFromCache(blurhash);

	if (cache !== "") {
		self.postMessage(await dataToBlobURL(cache));
		return;
	}

	const canvas = new MyOffscreenCanvas(width, height).fromBlurhash(blurhash);

	await saveToCache(blurhash, await canvas.convertToBase64());

	self.postMessage(await canvas.convertToBlobURL());
};
