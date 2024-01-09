<script setup lang="ts">
import renderImage from "./renderImage";
import { ref } from "vue";
import type MyImage from "../../utils/types/MyImage";

const props = defineProps({
	class: { type: String, default: "" },
	draggable: { type: Boolean, default: false },
	image: { type: Object as () => MyImage, required: true },
	imageClass: { type: String, default: "" },
	lazy: { type: Boolean, default: true },
});

const blurhashUrl = ref("");
const imageUrl = ref("");

renderImage(props.image, blurhashUrl, imageUrl);
</script>

<template>
	<div class="relative" :class="props.class">
		<!-- Blurhash placeholder -->
		<img
			v-if="blurhashUrl"
			:loading="props.lazy ? 'lazy' : 'eager'"
			class="left-0 top-0"
			:style="{
				opacity: blurhashUrl ? 1 : 0,
			}"
			:class="props.imageClass"
			:src="blurhashUrl"
			:draggable="props.draggable"
		/>

		<!-- Actual image -->
		<img
			v-if="imageUrl"
			:loading="props.lazy ? 'lazy' : 'eager'"
			class="absolute left-0 top-0"
			:style="{
				transition: 'opacity 0.5s ease',
			}"
			:src="imageUrl"
			:class="props.imageClass"
			:draggable="props.draggable"
		/>
	</div>
</template>
./renderBlurhash
