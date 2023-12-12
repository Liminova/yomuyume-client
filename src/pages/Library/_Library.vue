<script setup lang="ts">
import Image from "../../components/ImagePoly/_ImagePoly.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { randomCategories } from "../../utils/variables/random";
import { onMounted, ref } from "vue";

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const numberOfImagePerRow = ref(5);
const gapPixel = ref(16);

onMounted(() => {
	imageAutoResizer(imageContainerRef, imageHeight, numberOfImagePerRow, gapPixel.value, 1, 1);
});
</script>

<template>
	<NavDrawerWrapper>
		<div
			ref="imageContainerRef"
			class="mt-3 grid px-6 lg:mt-0 lg:pl-0 lg:pr-3"
			:style="{
				gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
				gap: `${gapPixel}px`,
			}"
		>
			<div v-for="category in randomCategories" :key="category.categoryUUID">
				<Image
					class="overflow-hidden rounded-xl"
					:image="category.cover"
					:style="{ height: imageHeight + 'px', transition: 'height 0.5s ease' }"
					image-class="h-full object-cover"
				/>
				<div class="mt-3 text-center text-xl font-bold">{{ category.title }}</div>
			</div>
		</div>
	</NavDrawerWrapper>
</template>
