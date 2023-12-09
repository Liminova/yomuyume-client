<script setup lang="ts">
import CardRecommend from "./CardRecommend.vue";
import CarouselWrapper from "./CarouselWrapper.vue";
import HomeTitle from "./HomeTitle.vue";
import { coverHeight, recommendsContainerHeight, gapPixel } from "./measurements";
import ItemCard from "../../components/ItemCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { randomRecommends, items } from "../../utils/variables/random";
import Routes from "../../utils/variables/routes";
import { register } from "swiper/element/bundle";
import { onMounted, ref } from "vue";

register();

const carouselContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
	imageAutoResizer(carouselContainerRef, coverHeight, undefined, gapPixel, 3, 4);
});

const continueReadingItems = items.slice(0, 25);

/** */
</script>

<template>
	<NavDrawerWrapper
		class="mt-3 flex w-full select-none flex-col gap-7 px-6 transition-all lg:mt-0 lg:pl-0 lg:pr-3"
	>
		<swiper-container
			class="w-full overflow-hidden rounded-3xl"
			:style="{ height: `${recommendsContainerHeight}px` }"
			:autoplay-delay="5000"
			:autoplay-disable-on-interaction="false"
		>
			<swiper-slide v-for="(item, index) in randomRecommends" :key="item.itemUUID">
				<CardRecommend
					:author="item.author"
					:cover-image="item.cover"
					:description="item.description"
					:tags="item.tags"
					:title="item.title"
					:is-first-item="index === 0"
					:is-last-item="index === randomRecommends.length - 1"
					:item-uuid="item.itemUUID"
				/>
			</swiper-slide>
		</swiper-container>

		<HomeTitle :path="Routes.ContinueReading">Continue reading</HomeTitle>
		<CarouselWrapper>
			<swiper-slide v-for="(item, index) in continueReadingItems" :key="item.itemUUID">
				<ItemCard
					:key="item.itemUUID"
					:cover-height="coverHeight"
					:title="item.title"
					:author="item.author"
					:release-date="item.releaseDate"
					:cover="item.cover"
					:is-first-item="index === 0"
					:is-last-item="index === items.length - 1"
					:progress="item.pageRead"
					:item-uuid="item.itemUUID"
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
