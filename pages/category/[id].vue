<script setup lang="ts">
import imageAutoResizer from "~/composables/functions/imageAutoResizer";
import NavDrawerWrapper from "~/layouts/NavDrawerWrapper.vue";

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const setImageHeight = (newVal: number) => (imageHeight.value = newVal);
const imagePerRow = ref(5);
const setImagePerRow = (newVal: number) => (imagePerRow.value = newVal);
const gapPixel = ref(16);

const categoryIdRaw = useRoute().params.id;
const categoryId = Array.isArray(categoryIdRaw) ? categoryIdRaw[0] : categoryIdRaw;
const snackbarMessage = ref("");
const setSnackbarMessage = (newVal: string) => (snackbarMessage.value = newVal);

const titles = ref<Array<FilterTitleResponse>>([]);

void (async () => {
	titles.value = await indexApi.filter(
		{
			category_ids: [categoryId],
		},
		setSnackbarMessage
	);
})();

onMounted(() => {
	imageAutoResizer(imageContainerRef, setImageHeight, setImagePerRow, gapPixel.value, 3, 4);
});
</script>

<template>
	<Snackbar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<NavDrawerWrapper>
		<div
			ref="imageContainerRef"
			class="my-3 grid px-6 lg:mt-0 lg:pl-0 lg:pr-3"
			:style="{
				gridTemplateColumns: `repeat(${imagePerRow}, 1fr)`,
				gap: `${gapPixel}px`,
			}"
		>
			<nuxt-link v-for="title in titles" :key="title.id" :to="`/title/${title.id}`">
				<ItemCard
					:title="title.title"
					:author="title.author ?? 'Unknown'"
					:title-id="title.id"
					:cover-height="imageHeight"
					:cover="{
						width: title.width,
						height: title.height,
						blurhash: title.blurhash,
						format: title.format,
						src: fileApiUrl.thumbnail(title.id),
					}"
				>
				</ItemCard>
			</nuxt-link>
		</div>
	</NavDrawerWrapper>
</template>
