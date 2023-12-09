import SharedWorkerRenderer from "./classes/SharedWorkerRenderer";
import WebWorkerRenderer from "./classes/WebWorkerRenderer";
import { isAvifSupported, isJxlSupported } from "./isFormatSupported";
import type MyImage from "../../utils/types/MyImage";
import type { Renderer } from "./classes/RendererInterface";
import type { Ref } from "vue";

const renderer: Renderer =
	"SharedWorker" in window ? new SharedWorkerRenderer() : new WebWorkerRenderer();

/**
 * Renders the blurhash and the actual image using Shared/Web Workers.
 *
 * @param image a MyImage object
 * @param renderedBlurhashRef the ref to store the rendered blurhash
 * @param renderedImageRef the ref to store the rendered actual image
 */
export default function renderImage(
	image: MyImage,
	renderedBlurhashRef: Ref<string>,
	renderedImageRef: Ref<string>
) {
	const isNative =
		(image.format === "jxl" && isJxlSupported) || (image.format === "avif" && isAvifSupported);

	renderer.newJob(image, renderedBlurhashRef, renderedImageRef, isNative);
}
