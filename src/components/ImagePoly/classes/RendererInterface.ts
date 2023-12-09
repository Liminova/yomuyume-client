import type MyImage from "../../../utils/types/MyImage";
import type { Ref } from "vue";

export type Renderer = {
	/**
	 * Create a new job for the renderer
	 *
	 * @param image the image to render
	 * @param renderedBlurhashRef vue ref to the blurhash
	 * @param renderedImageRef vue ref to the rendered image
	 * @param isNative whether the browser supports that format natively
	 */
	newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedImageRef: Ref<string>,
		isNative: boolean
	): void;
};
