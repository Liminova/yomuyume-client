<script setup lang="ts">
import indexApi from "../../api";
import fileApiUrl from "../../api/file";
import ItemCard from "../../components/ItemCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import SnackBar from "../../components/SnackBar.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { inject, onMounted, ref } from "vue";
import type { FilterTitleResponseBody } from "../../api";
import type { Router } from "vue-router";

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const numberOfImagePerRow = ref(5);
const gapPixel = ref(16);

const router = inject("router", {}) as Router;
const categoryIdRaw = router.currentRoute.value.params.categoryId;
const categoryId = Array.isArray(categoryIdRaw) ? categoryIdRaw[0] : categoryIdRaw;
const snackbarMessage = ref("");

const titles = ref<Array<FilterTitleResponseBody>>([]);

void (async () => {
	titles.value = await indexApi.filter(
		{
			category_ids: [categoryId],
		},
		snackbarMessage
	);
})();

onMounted(() => {
	imageAutoResizer(imageContainerRef, imageHeight, numberOfImagePerRow, gapPixel.value, 3, 4);
});
</script>

<template>
	<SnackBar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<NavDrawerWrapper>
		<div
			ref="imageContainerRef"
			class="my-3 grid px-6 lg:mt-0 lg:pl-0 lg:pr-3"
			:style="{
				gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
				gap: `${gapPixel}px`,
			}"
		>
			<router-link v-for="title in titles" :key="title.id" :to="`/title/${title.id}`">
				<ItemCard
					:title="title.title"
					:author="title.author ?? 'Unknown'"
					:title-id="title.id"
					:cover-height="imageHeight"
					:cover="{
						width: title.width,
						height: title.height,
						blurhash: title.blurhash,
						src: fileApiUrl.thumbnail(title.id),
					}"
				>
				</ItemCard>
			</router-link>
		</div>
	</NavDrawerWrapper>
</template>
