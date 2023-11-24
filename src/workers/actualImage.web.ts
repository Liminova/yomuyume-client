// eslint-disable-next-line import/no-absolute-path
import avifDec from "/avif_dec.js?url";
// eslint-disable-next-line import/no-absolute-path
import jxlDec from "/jxl_dec.js?url";
import { getFromCache, saveToCache } from "../utils/functions/cacheOperations";
import MyOffscreenCanvas from "../utils/classes/MyOffscreenCanvas";
import dataToBlobURL from "../utils/functions/dataToBlobURL";

type MyMessageData = {
	src: string;
	format: string;
}

function getImageDecoder(format: string) {
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
