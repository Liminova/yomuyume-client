<script setup lang="ts">
import Image from "../../components/ImagePoly/_ImagePoly.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { CATEGORIES } from "../../utils/variables/MOCK";
import { onMounted, ref } from "vue";

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(300);
const numberOfImagePerRow = ref(5);

onMounted(() => {
	imageAutoResizer(imageContainerRef, imageHeight, numberOfImagePerRow, 12, 1, 1);
});

/** */
</script>

<template>
	<NavDrawerWrapper>
		<div
			ref="imageContainerRef"
			class="mt-3 grid gap-4 px-6 transition-all lg:mt-0 lg:pl-0 lg:pr-3"
			:style="{
				gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
			}"
		>
			<div v-for="category in CATEGORIES" :key="category.category_uuid">
				<Image
					class="overflow-hidden rounded-xl"
					:image="category.coverImage"
					:style="{ height: imageHeight + 'px', transition: 'height 0.5s ease' }"
					image-class="h-full object-cover"
				/>
				<div class="mt-3 text-center text-xl font-bold">{{ category.name }}</div>
			</div>
		</div>
	</NavDrawerWrapper>
</template>
