<script setup lang="ts">
import HorizontalScrollList from "./HorizontalScrollList.vue";
import RecommendedCard from "./RecommendedCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import { isNavDrawerLarge } from "../../store";
import { debounce } from "debounce";
import { register } from "swiper/element/bundle";
import { onMounted, ref } from "vue";
import "vueperslides/dist/vueperslides.css";

register();

const elementWidthRef = ref<HTMLElement | null>(null);

const gapPixel = 18;
const xRatio = 1;
const yRatio = 2;
const carouselHeight = ref("");

onMounted(() => {
	if (window.innerWidth < 1280) {
		isNavDrawerLarge.value = false;
	}

	function changeCarouselHeight() {
		if (!elementWidthRef.value) {
			return;
		}

		const numberOfCards = (() => {
			switch (true) {
				case window.innerWidth < 768:
					return 2;
				case window.innerWidth < 1024:
					return 3;
				case window.innerWidth < 1280:
					return 4;
				case window.innerWidth < 1536:
					return 5;
				case window.innerWidth < 1792:
					return 6;
				default:
					return 7;
			}
		})();
		const totalGapPixel = (numberOfCards - 1) * gapPixel;
		const xAxisOfCard = (elementWidthRef.value.offsetWidth - totalGapPixel) / numberOfCards;
		const yAxisOfCard = (xAxisOfCard * yRatio) / xRatio;

		carouselHeight.value = `height: ${Math.round(yAxisOfCard)}px`;
	}

	if (elementWidthRef.value) {
		const resizeObserver = new ResizeObserver(debounce(changeCarouselHeight, 100));

		resizeObserver.observe(elementWidthRef.value);
	}
});
</script>

<template>
	<!-- NOTE: changing the size of gap requires changing the width calculation of all below horizontal container -->
	<NavDrawerWrapper
		class="mb-6 mt-3 flex w-full select-none flex-col gap-7 px-6 transition-all lg:mt-0 lg:pl-0 lg:pr-3"
	>
		<swiper-container
			class="h-[500px] w-full overflow-hidden rounded-3xl"
			:autoplay-delay="5000"
			:autoplay-disable-on-interaction="false"
		>
			<swiper-slide v-for="i in 10" :key="i">
				<RecommendedCard
					:title="`Some very long title of a comic ${i}`"
					author="Some one"
					:is-completed="1"
					:pages="100"
					:is-colored="1"
					release-year="2023"
					description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique alias nemo inventore eum rerum quibusdam laudantium a, omnis officia sit placeat obcaecati quia. Cumque dolores quod voluptatem vel adipisci quidem esse, porro provident iste doloribus hic blanditiis earum nostrum corrupti. Omnis corporis, necessitatibus, totam facere quibusdam consequuntur magni perferendis corrupti nulla odio recusandae accusantium praesentium eaque provident."
					cover-image-url="/placeholder.svg"
				/>
			</swiper-slide>
		</swiper-container>

		<div ref="elementWidthRef" class="text-4xl font-bold">Continue reading</div>
		<HorizontalScrollList :carousel-height="carouselHeight" :gap-pixel="gapPixel" />
		<div class="text-4xl font-bold">Newly updated</div>
		<HorizontalScrollList :carousel-height="carouselHeight" :gap-pixel="gapPixel" />
		<div class="text-4xl font-bold">Recently added</div>
		<HorizontalScrollList :carousel-height="carouselHeight" :gap-pixel="gapPixel" />
	</NavDrawerWrapper>
</template>
