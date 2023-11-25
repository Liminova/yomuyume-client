<script setup lang="ts">
import renderImage from "../utils/functions/renderImage";
import { ref, watchEffect } from "vue";
import type MyImage from "../utils/interfaces/MyImage";

const props = defineProps({
	class: { type: String, default: "" },
	draggable: { type: Boolean, default: false },
	emitRenderedImgBlobUrl: { type: Boolean, default: false },
	image: { type: Object as () => MyImage, required: true },
	imageClass: { type: String, default: "" },
	lazy: { type: Boolean, default: true },
});

const emit = defineEmits(["send-message"]);
const renderedBlurhashBlobURL = ref("");
const renderedActualImageBlobURL = ref("");

if (props.emitRenderedImgBlobUrl) {
	watchEffect(() => {
		if (renderedActualImageBlobURL.value) {
			emit("send-message", renderedActualImageBlobURL.value);
		}
	});
}

renderImage(props.image, renderedBlurhashBlobURL, renderedActualImageBlobURL).catch(() => {
	/** */
});
</script>

<template>
	<div class="relative" :class="props.class">
		<!-- Blurhash placeholder -->
		<img
			:loading="props.lazy ? 'lazy' : 'eager'"
			class="left-0 top-0"
			:style="{
				opacity: renderedBlurhashBlobURL ? 1 : 0,
			}"
			:class="props.imageClass"
			:src="renderedBlurhashBlobURL"
			:draggable="props.draggable"
		/>

		<!-- Actual image -->
		<img
			:loading="props.lazy ? 'lazy' : 'eager'"
			class="absolute left-0 top-0"
			:style="{
				opacity: renderedActualImageBlobURL ? 1 : 0,
				transition: 'opacity 0.5s ease',
			}"
			:class="props.imageClass"
			:src="renderedActualImageBlobURL"
			:draggable="props.draggable"
		/>
	</div>
</template>
