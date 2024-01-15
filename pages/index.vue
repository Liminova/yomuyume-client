<script setup lang="ts">
import { register } from "swiper/element/bundle";
import CardRecommend from "~/components/home/CardRecommend.vue";
import CarouselWrapper from "~/components/home/CarouselWrapper.vue";
import HomeTitle from "~/components/home/HomeTitle.vue";
import { homeStore } from "~/components/home/homeStore";
import imageAutoResizer from "~/composables/functions/imageAutoResizer";
import NavDrawerWrapper from "~/layouts/NavDrawerWrapper.vue";

document.title = "Yomuyume - Home";

register();

const store = homeStore();
const carouselContainerRef = ref<HTMLElement | null>(null);
const snackbarMessage = ref("");
const empty = () => {
	/** */
};

onMounted(() => {
	imageAutoResizer(carouselContainerRef, store.setCoverHeight, empty, store.gapPixel, 3, 4);
});

const recommendsItems: Ref<Array<FilterTitleResponse>> = ref([]);
const recentlyUpdatedItems: Ref<Array<FilterTitleResponse>> = ref([]);
const newlyAddedItems: Ref<Array<FilterTitleResponse>> = ref([]);
const completedStoriesItems: Ref<Array<FilterTitleResponse>> = ref([]);

void Promise.all([
	indexApi.filter({ keywords: [""], limit: 10 }, store.setSnackbarMessage),
	indexApi.filter(
		{ keywords: [""], limit: 10, sort_by: "update date", sort_order: "descending" },
		store.setSnackbarMessage
	),
	indexApi.filter(
		{ keywords: [""], limit: 10, sort_by: "add date", sort_order: "descending" },
		store.setSnackbarMessage
	),
	indexApi.filter({ keywords: [""], limit: 10, is_finished: true }, store.setSnackbarMessage),
]).then(([recommends, recentlyUpdated, newlyAdded, completedStories]) => {
	recommendsItems.value = recommends;
	recentlyUpdatedItems.value = recentlyUpdated;
	newlyAddedItems.value = newlyAdded;
	completedStoriesItems.value = completedStories;
});
</script>

<template>
	<div>
		<Snackbar :message="snackbarMessage" @close="snackbarMessage = ''" />
		<NavDrawerWrapper class="mt-3 flex w-full flex-col gap-7 px-6 lg:mt-0 lg:pl-0 lg:pr-3">
			<swiper-container
				class="w-full overflow-hidden rounded-3xl"
				:style="{ height: `${store.recommendsContainerHeight}px` }"
				:autoplay-delay="5000"
				:autoplay-disable-on-interaction="false"
			>
				<swiper-slide v-for="(title, index) in recommendsItems" :key="title.id">
					<CardRecommend
						:is-first-title="index === 0"
						:is-last-title="index === recommendsItems.length - 1"
						:preview-title="title"
					/>
				</swiper-slide>
			</swiper-container>

			<HomeTitle>Recently updated</HomeTitle>
			<CarouselWrapper>
				<swiper-slide v-for="title in recentlyUpdatedItems" :key="title.id">
					<ItemCard
						:key="title.id"
						:author="title.author ?? 'Unknown'"
						:cover="{
							src: fileApiUrl.thumbnail(title.id),
							width: title.width,
							height: title.height,
							blurhash: title.blurhash,
							format: title.format,
						}"
						:cover-height="store.coverHeight"
						:progress="title.page_read ? title.page_read / title.page_count : 0"
						:title-id="title.id"
						:title="title.title"
					/>
				</swiper-slide>
			</CarouselWrapper>
			<HomeTitle>Newly added</HomeTitle>
			<CarouselWrapper>
				<swiper-slide v-for="title in newlyAddedItems" :key="title.id">
					<ItemCard
						:key="title.id"
						:author="title.author ?? 'Unknown'"
						:cover="{
							src: fileApiUrl.thumbnail(title.id),
							width: title.width,
							height: title.height,
							blurhash: title.blurhash,
							format: title.format,
						}"
						:cover-height="store.coverHeight"
						:progress="title.page_read ? title.page_read / title.page_count : 0"
						:title-id="title.id"
						:title="title.title"
					/>
				</swiper-slide>
			</CarouselWrapper>
			<HomeTitle>Completed stories</HomeTitle>
			<CarouselWrapper>
				<swiper-slide v-for="title in completedStoriesItems" :key="title.id">
					<ItemCard
						:key="title.id"
						:author="title.author ?? 'Unknown'"
						:cover="{
							src: fileApiUrl.thumbnail(title.id),
							width: title.width,
							height: title.height,
							blurhash: title.blurhash,
							format: title.format,
						}"
						:cover-height="store.coverHeight"
						:progress="title.page_read ? title.page_read / title.page_count : 0"
						:title-id="title.id"
						:title="title.title"
					/>
				</swiper-slide>
			</CarouselWrapper>

			<div ref="carouselContainerRef" class="w-full"></div>
		</NavDrawerWrapper>
	</div>
</template>
