<script setup lang="ts">
import CardRecommend from "./CardRecommend.vue";
import CarouselWrapper from "./CarouselWrapper.vue";
import HomeTitle from "./HomeTitle.vue";
import { coverHeight, recommendsContainerHeight, gapPixel } from "./measurements";
import ItemCard from "../../components/ItemCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { randomRecommends, titles } from "../../utils/variables/random";
import Routes from "../../utils/variables/routes";
import { register } from "swiper/element/bundle";
import { onMounted, ref } from "vue";

register();

const carouselContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
	imageAutoResizer(carouselContainerRef, coverHeight, undefined, gapPixel, 3, 4);
});

const continueReadingItems = titles.slice(0, 25);

/** */
</script>

<template>
	<NavDrawerWrapper
		class="mt-3 flex w-full select-none flex-col gap-7 px-6 lg:mt-0 lg:pl-0 lg:pr-3"
	>
		<swiper-container
			class="w-full overflow-hidden rounded-3xl"
			:style="{ height: `${recommendsContainerHeight}px` }"
			:autoplay-delay="5000"
			:autoplay-disable-on-interaction="false"
		>
			<swiper-slide v-for="(title, index) in randomRecommends" :key="title.id">
				<CardRecommend
					:author="title.author"
					:cover-image="title.cover"
					:description="title.description"
					:tags="title.tags"
					:title="title.title"
					:is-first-title="index === 0"
					:is-last-title="index === randomRecommends.length - 1"
					:title-id="title.id"
				/>
			</swiper-slide>
		</swiper-container>

		<HomeTitle :path="Routes.ContinueReading">Continue reading</HomeTitle>
		<CarouselWrapper>
			<swiper-slide v-for="title in continueReadingItems" :key="title.id">
				<ItemCard
					:key="title.id"
					:author="title.author"
					:cover="title.cover"
					:cover-height="coverHeight"
					:progress="title.pageRead"
					:title-id="title.id"
					:title="title.title"
				/>
			</swiper-slide>
		</CarouselWrapper>

		<HomeTitle :path="Routes.RecentlyUpdated">Recently updated</HomeTitle>
		<HomeTitle :path="Routes.NewlyAdded">Newly added</HomeTitle>
		<HomeTitle :path="Routes.CompletedStories">Completed stories</HomeTitle>
		<HomeTitle :path="Routes.CompletedReads">Completed reads</HomeTitle>

		<div ref="carouselContainerRef" class="w-full"></div>
	</NavDrawerWrapper>
</template>
