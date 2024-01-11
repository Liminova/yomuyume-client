<script setup lang="ts">
import CardRecommend from "./CardRecommend.vue";
import CarouselWrapper from "./CarouselWrapper.vue";
import HomeTitle from "./HomeTitle.vue";
import { coverHeight, recommendsContainerHeight, gapPixel } from "./store";
import indexApi from "../../api";
import fileApiUrl from "../../api/file";
import ItemCard from "../../components/ItemCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import SnackBar from "../../components/SnackBar.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import Routes from "../../utils/variables/routes";
import { register } from "swiper/element/bundle";
import { onMounted, ref } from "vue";
import type { FilterTitleResponse } from "../../api";
import type { Ref } from "vue";

register();

const carouselContainerRef = ref<HTMLElement | null>(null);
const snackbarMessage = ref("");

onMounted(() => {
	imageAutoResizer(carouselContainerRef, coverHeight, undefined, gapPixel, 3, 4);
});

const recommendsItems: Ref<Array<FilterTitleResponse>> = ref([]);
const recentlyUpdatedItems: Ref<Array<FilterTitleResponse>> = ref([]);
const newlyAddedItems: Ref<Array<FilterTitleResponse>> = ref([]);
const completedStoriesItems: Ref<Array<FilterTitleResponse>> = ref([]);

void Promise.all([
	indexApi.filter({ keywords: [""], limit: 10 }, snackbarMessage),
	indexApi.filter(
		{ keywords: [""], limit: 10, sort_by: "update date", sort_order: "descending" },
		snackbarMessage
	),
	indexApi.filter(
		{ keywords: [""], limit: 10, sort_by: "add date", sort_order: "descending" },
		snackbarMessage
	),
	indexApi.filter({ keywords: [""], limit: 10, is_finished: true }, snackbarMessage),
]).then(([recommends, recentlyUpdated, newlyAdded, completedStories]) => {
	recommendsItems.value = recommends;
	recentlyUpdatedItems.value = recentlyUpdated;
	newlyAddedItems.value = newlyAdded;
	completedStoriesItems.value = completedStories;
});

document.title = "Yomuyume - Home";
</script>

<template>
	<SnackBar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<NavDrawerWrapper class="mt-3 flex w-full flex-col gap-7 px-6 lg:mt-0 lg:pl-0 lg:pr-3">
		<swiper-container
			class="w-full overflow-hidden rounded-3xl"
			:style="{ height: `${recommendsContainerHeight}px` }"
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

		<!-- <HomeTitle :path="Routes.ContinueReading">Continue reading</HomeTitle>
		<CarouselWrapper>
			<swiper-slide v-for="title in continueReadingItems" :key="title.id">
				<ItemCard
					:key="title.id"
					:author="title.author ?? 'Unknown'"
					:cover="{
						src: fileApi.thumbnail(title.id),
						width: title.width,
						height: title.height,
						blurhash: title.blurhash,
					}"
					:cover-height="coverHeight"
					:progress="title.page_read ? title.page_read / title.page_count : 0"
					:title-id="title.id"
					:title="title.title" />
			</swiper-slide>
		</CarouselWrapper> -->

		<HomeTitle :path="Routes.RecentlyUpdated">Recently updated</HomeTitle>
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
					}"
					:cover-height="coverHeight"
					:progress="title.page_read ? title.page_read / title.page_count : 0"
					:title-id="title.id"
					:title="title.title"
				/>
			</swiper-slide>
		</CarouselWrapper>
		<HomeTitle :path="Routes.NewlyAdded">Newly added</HomeTitle>
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
					}"
					:cover-height="coverHeight"
					:progress="title.page_read ? title.page_read / title.page_count : 0"
					:title-id="title.id"
					:title="title.title"
				/>
			</swiper-slide>
		</CarouselWrapper>
		<HomeTitle :path="Routes.CompletedStories">Completed stories</HomeTitle>
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
					}"
					:cover-height="coverHeight"
					:progress="title.page_read ? title.page_read / title.page_count : 0"
					:title-id="title.id"
					:title="title.title"
				/>
			</swiper-slide>
		</CarouselWrapper>
		<!-- <HomeTitle :path="Routes.CompletedReads">Completed reads</HomeTitle> -->

		<div ref="carouselContainerRef" class="w-full"></div>
	</NavDrawerWrapper>
</template>
