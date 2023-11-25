import SharedWorkerRenderer from "./classes/SharedWorkerRenderer";
import WebWorkerRenderer from "./classes/WebWorkerRenderer";
import type MyImage from "../../utils/interfaces/MyImage";
import type { Ref } from "vue";

/**
 * Renders the blurhash and the actual image using Shared/Web Workers.
 *
 * @param image a MyImage object
 * @param renderedBlurhashRef the ref to store the rendered blurhash
 * @param renderedImageRef the ref to store the rendered actual image
 */
export default async function renderImage(
	image: MyImage,
	renderedBlurhashRef: Ref<string>,
	renderedImageRef: Ref<string>
) {
	const renderer =
		"SharedWorker" in window ? new SharedWorkerRenderer() : new WebWorkerRenderer();

	await renderer.newJob(image, renderedBlurhashRef, renderedImageRef);
}
