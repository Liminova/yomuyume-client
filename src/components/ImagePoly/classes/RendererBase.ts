import type MyImage from "../../../utils/types/MyImage";
import type { Ref } from "vue";

export default abstract class RendererBase {
	abstract newJob(
		image: MyImage,
		renderedBlurhashRef: Ref<string>,
		renderedActualImageRef: Ref<string>,
		isNative: Ref<boolean>
	): Promise<void>;
}