<script setup lang="ts">
import imageAutoResizer from "~/composables/functions/imageAutoResizer";
import NavDrawerWrapper from "~/layouts/NavDrawerWrapper.vue";

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const setImageHeight = (newVal: number) => (imageHeight.value = newVal);
const numberOfImagePerRow = ref(5);
const setNumberOfImagePerRow = (newVal: number) => (numberOfImagePerRow.value = newVal);
const gapPixel = ref(16);

const snackbarMessage = ref("");
const setSnackbarMessage = (newVal: string) => (snackbarMessage.value = newVal);

const categories = ref<Array<CategoryResponse>>([]);

void (async () => {
	categories.value = await indexApi.categories(setSnackbarMessage);
})();

onMounted(() => {
	imageAutoResizer(
		imageContainerRef,
		setImageHeight,
		setNumberOfImagePerRow,
		gapPixel.value,
		1,
		1
	);
});

document.title = "Yomuyume - Library";
</script>

<template>
	<div>
		<Snackbar :message="snackbarMessage" @close="snackbarMessage = ''" />

		<NavDrawerWrapper>
			<div
				ref="imageContainerRef"
				class="mt-3 grid px-6 lg:mt-0 lg:pl-0 lg:pr-3"
				:style="{
					gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
					gap: `${gapPixel}px`,
				}"
			>
				<nuxt-link
					v-for="category in categories"
					:key="category.id"
					:to="`/category/${category.id}`"
					class="elevation-2 rounded-xl"
				>
					<div class="my-3 text-center text-xl font-bold">{{ category.name }}</div>
				</nuxt-link>
			</div>
		</NavDrawerWrapper>
	</div>
</template>
