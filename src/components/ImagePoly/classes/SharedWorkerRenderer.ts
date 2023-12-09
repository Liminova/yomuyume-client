import type MyImage from "../../../utils/types/MyImage";
import type { Renderer } from "./RendererInterface";
import type { Ref } from "vue";

export default class SharedWorkerRenderer implements Renderer {
	newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedImageRef: Ref<string>,
		isNative: boolean
	) {
		const blurhashWorker = new SharedWorker(
			new URL("../workers/blurhash.shared.ts", import.meta.url),
			{
				type: "module",
				name: "blurhashRenderer",
			}
		);

		blurhashWorker.port.onmessage = (event: MessageEvent<string>) =>
			(renderedBlurhashRef.value = event.data);
		blurhashWorker.port.postMessage([image.blurhash, image.width, image.height]);

		if (isNative) {
			renderedImageRef.value = image.src;
			return;
		}

		const imgWorker = new SharedWorker(
			new URL("../workers/actualImage.shared.ts", import.meta.url),
			{
				type: "module",
				name: "actualImageRenderer",
			}
		);

		imgWorker.port.onmessage = (event: MessageEvent<string>) =>
			(renderedImageRef.value = event.data);
		imgWorker.port.postMessage([image.src, image.format]);
	}
}
