import doNeedPolyfill from "../doNeedPolyfill";
import type MyImage from "../../../utils/types/MyImage";
import type RendererBase from "./RendererBase";
import type { Ref } from "vue";

export default class SharedWorkerRenderer implements RendererBase {
	async newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedActualImageRef: Ref<string>
	) {
		const blurhashWorker = new SharedWorker(
			new URL("../../workers/blurhash.shared.ts", import.meta.url),
			{
				type: "module",
				name: "blurhashRenderer",
			}
		);

		blurhashWorker.port.onmessage = (event: MessageEvent<string>) => {
			renderedBlurhashRef.value = event.data;
		};

		blurhashWorker.port.postMessage({
			blurhash: image.blurhash,
			width: image.width,
			height: image.height,
		});

		if (await doNeedPolyfill(image)) {
			const actualImageWorker = new SharedWorker(
				new URL("../../workers/actualImage.shared.ts", import.meta.url),
				{
					type: "module",
					name: "actualImageRenderer",
				}
			);

			actualImageWorker.port.onmessage = (event: MessageEvent<string>) => {
				renderedActualImageRef.value = event.data;
			};

			actualImageWorker.port.postMessage({
				src: image.src,
				format: image.format,
			});
		} else {
			renderedActualImageRef.value = image.src;
		}
	}
}
