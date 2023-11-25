<script setup lang="ts">
import CardRecommend from "./CardRecommend.vue";
import CarouselCard from "./CarouselCard.vue";
import CarouselWrapper from "./CarouselWrapper.vue";
import HomeTitle from "./HomeTitle.vue";
import { coverHeight, recommendsContainerHeight, gapPixel } from "./measurements";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { RECOMMENDATIONS, ITEMS } from "../../utils/variables/MOCK";
import Routes from "../../utils/variables/routes";
import { register } from "swiper/element/bundle";
import { onMounted, ref } from "vue";

register();

const carouselContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
	imageAutoResizer(carouselContainerRef, coverHeight, undefined, gapPixel, 3, 4);
});
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
			<swiper-slide v-for="(item, index) in RECOMMENDATIONS" :key="item.itemUUID">
				<CardRecommend
					:artist="item.artist"
					:cover-image="item.coverImage"
					:description="item.description"
					:is-completed="item.isCompleted"
					:random-page="item.randomPage"
					:tags="item.tags"
					:title="item.title"
					:is-first-item="index === 0"
					:is-last-item="index === RECOMMENDATIONS.length - 1"
				/>
			</swiper-slide>
		</swiper-container>

		<HomeTitle :path="Routes.ContinueReading">Continue reading</HomeTitle>
		<CarouselWrapper>
			<CarouselCard
				v-for="(item, index) in ITEMS"
				:key="item.itemUUID"
				:title="item.title"
				:artist="item.artist"
				:release-date="item.releaseDate"
				:cover="item.coverImage"
				:is-first-item="index === 0"
				:is-last-item="index === ITEMS.length - 1"
				:progress="item.pageRead / item.pageCount"
				:language="item.language"
			/>
		</CarouselWrapper>

		<HomeTitle :path="Routes.RecentlyUpdated">Recently updated</HomeTitle>

		<HomeTitle :path="Routes.NewlyAdded">Newly added</HomeTitle>

		<div ref="carouselContainerRef" class="w-full"></div>
	</NavDrawerWrapper>
</template>
