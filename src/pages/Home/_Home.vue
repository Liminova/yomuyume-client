<script setup lang="ts">
import ItemCard from "./ItemCard.vue";
import LastItemCard from "./LastItemCard.vue";
import RecommendedCard from "./RecommendedCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import Routes from "../../routes";
import { isNavDrawerLarge } from "../../store";
import { onBeforeMount, onMounted, ref } from "vue";
// @ts-expect-error - vueperslides has no types
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

function getCarouselRatio(
	numberOfCards: number,
	gapPercentage: number,
	xRatio: number,
	yRatio: number
): number {
	const totalGapPercentage = (numberOfCards - 1) * gapPercentage;
	const xAxisOfCard = (100 - totalGapPercentage) / numberOfCards;
	const yAxisOfCard = (xAxisOfCard * yRatio) / xRatio;

	return yAxisOfCard / 100;
}

const slideGap = 2;
const visibleSlides = ref(4);
const slideRatio = ref(getCarouselRatio(visibleSlides.value, slideGap, 1, 2));

function setVisibleSlide(newVisibleSlides: number) {
	visibleSlides.value = newVisibleSlides;
	slideRatio.value = getCarouselRatio(newVisibleSlides, slideGap, 1, 2);
}

onBeforeMount(() => {
	switch (true) {
		case window.innerWidth < 768: {
			setVisibleSlide(2);
			break;
		}

		case window.innerWidth < 1024: {
			setVisibleSlide(3);
			break;
		}

		case window.innerWidth < 1280: {
			setVisibleSlide(4);
			break;
		}

		case window.innerWidth < 1536: {
			setVisibleSlide(5);
			break;
		}

		default: {
			setVisibleSlide(6);
			break;
		}
	}
});

onMounted(() => {
	if (window.innerWidth < 1280) {
		isNavDrawerLarge.value = false;
	}
});
</script>

<template>
	<!-- NOTE: changing the size of gap requires changing the width calculation of all below horizontal container -->
	<NavDrawerWrapper
		class="mb-6 mt-3 flex w-full flex-col gap-7 px-6 transition-all lg:mt-0 lg:pl-0 lg:pr-3"
	>
		<vueper-slides
			class="no-shadow recommended-slide"
			autoplay
			:gap="7"
			:bullets="false"
			:touchable="true"
			:arrows="false"
			:dragging-distance="70"
			fixed-height="500px"
			:visible-slides="1"
		>
			<vueper-slide v-for="i in 5" :key="i">
				<template #content>
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
				</template>
			</vueper-slide>
		</vueper-slides>

		<div ref="elementWidthRef" class="text-4xl font-bold">Continue reading</div>
		<vueper-slides
			:arrows="false"
			:dragging-distance="70"
			:gap="slideGap"
			class="no-shadow content-slide"
			slide-multiple
			:slide-ratio="slideRatio"
			:visible-slides="visibleSlides"
		>
			<vueper-slide v-for="i in 9" :key="i" class="h-full w-full">
				<template #content>
					<ItemCard
						cover-image-url="/placeholder.svg"
						title="Place anything you like here"
						artist="Smbdy"
					/>
				</template>
			</vueper-slide>
			<vueper-slide>
				<template #content>
					<LastItemCard :to="Routes.ContinueReading" />
				</template>
			</vueper-slide>
		</vueper-slides>

		<div ref="elementWidthRef" class="text-4xl font-bold">Newly updated</div>
		<vueper-slides
			:arrows="false"
			:dragging-distance="70"
			:gap="slideGap"
			class="no-shadow content-slide"
			slide-multiple
			:slide-ratio="slideRatio"
			:visible-slides="visibleSlides"
		>
			<vueper-slide v-for="i in 9" :key="i" class="h-full w-full">
				<template #content>
					<ItemCard
						cover-image-url="/placeholder.svg"
						title="Place anything you like here"
						artist="Smbdy"
					/>
				</template>
			</vueper-slide>
			<vueper-slide>
				<template #content>
					<!-- TODO: replace the route -->
					<LastItemCard to="/" />
				</template>
			</vueper-slide>
		</vueper-slides>

		<div ref="elementWidthRef" class="text-4xl font-bold">Recently added</div>
		<vueper-slides
			:arrows="false"
			:dragging-distance="70"
			:gap="slideGap"
			class="no-shadow content-slide"
			slide-multiple
			:slide-ratio="slideRatio"
			:visible-slides="visibleSlides"
		>
			<vueper-slide v-for="i in 9" :key="i" class="h-full w-full">
				<template #content>
					<ItemCard
						cover-image-url="/placeholder.svg"
						title="Place anything you like here"
						artist="Smbdy"
					/>
				</template>
			</vueper-slide>
			<vueper-slide>
				<template #content>
					<LastItemCard :to="Routes.RecentlyAdded" />
				</template>
			</vueper-slide>
		</vueper-slides>
	</NavDrawerWrapper>
</template>

<style lang="scss">
.recommended-slide {
	.vueperslides__track {
		@apply rounded-3xl;
	}
}

.content-slide {
	.vueperslides__track {
		@apply rounded-xl;
	}
}
</style>
