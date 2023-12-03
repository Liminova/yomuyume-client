import avifDec from "../../../assets/avif_dec.js";
import jxlDec from "../../../assets/jxl_dec.js";
import { getFromCache, saveToCache } from "../cacheOperations";
import MyOffscreenCanvas from "../classes/MyOffscreenCanvas";
import dataToBlobURL from "../dataToBlobURL";

type MyMessageData = {
	src: string;
	format: string;
};

function getImageDecoder(format: string) {
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

self.onmessage = async (event: MessageEvent<MyMessageData>) => {
	const { src, format } = event.data;

	if (!src || !format) {
		return;
	}

	const cache = await getFromCache(src);

	if (cache !== "") {
		self.postMessage(await dataToBlobURL(cache));
		return;
	}

	/** Fetch image from network */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	const decoder = await getImageDecoder(format);
	const rawImageData = await fetch(src);

	if (!rawImageData.ok) {
		throw new Error("Failed to fetch image from network");
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	const decodedImage: ImageData = decoder.decode(await rawImageData.arrayBuffer());

	const canvas = new MyOffscreenCanvas(decodedImage.width, decodedImage.height).fromImageData(
		decodedImage
	);

	await saveToCache(src, await canvas.convertToBase64());

	self.postMessage(await canvas.convertToBlobURL());
};
