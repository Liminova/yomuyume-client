<script setup lang="ts">
import indexApi from "../../api";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import SnackBar from "../../components/SnackBar.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { onMounted, ref } from "vue";
import type { CategoryResponse } from "../../api";

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const numberOfImagePerRow = ref(5);
const gapPixel = ref(16);

const snackbarMessage = ref("");
const categories = ref<Array<CategoryResponse>>([]);

void (async () => {
	categories.value = await indexApi.categories(snackbarMessage);
})();

onMounted(() => {
	imageAutoResizer(imageContainerRef, imageHeight, numberOfImagePerRow, gapPixel.value, 1, 1);
});

document.title = "Yomuyume - Library";
</script>

<template>
	<SnackBar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<NavDrawerWrapper>
		<div
			ref="imageContainerRef"
			class="mt-3 grid px-6 lg:mt-0 lg:pl-0 lg:pr-3"
			:style="{
				gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
				gap: `${gapPixel}px`,
			}"
		>
			<router-link
				v-for="category in categories"
				:key="category.id"
				:to="`/category/${category.id}`"
				class="elevation-2 rounded-xl"
			>
				<!-- <Image
					class="overflow-hidden rounded-xl"
					:image="category.cover"
					:style="{ height: imageHeight + 'px', transition: 'height 0.5s ease' }"
					image-class="h-full object-cover" /> -->
				<div class="my-3 text-center text-xl font-bold">{{ category.name }}</div>
			</router-link>
		</div>
	</NavDrawerWrapper>
</template>
