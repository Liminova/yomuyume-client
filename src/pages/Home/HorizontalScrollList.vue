<script setup lang="ts">
import ItemCard from "./ItemCard.vue";

const props = defineProps({
	carouselHeight: { type: String, required: true },
	gapPixel: { type: Number, required: true },
});

/** */
</script>

<template>
	<swiper-container
		class="w-full overflow-hidden rounded-t-xl transition-all"
		:style="props.carouselHeight"
		:space-between="props.gapPixel"
		:slides-per-view="2"
		:breakpoints="{
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
			1280: {
				slidesPerView: 5,
			},
			1536: {
				slidesPerView: 6,
			},
			1792: {
				slidesPerView: 7,
			},
		}"
	>
		<swiper-slide v-for="i in 9" :key="i" class="flex items-center justify-center">
			<ItemCard
				cover-image-url="/placeholder.svg"
				title="Place anything you like here"
				artist="Smbdy"
			/>
		</swiper-slide>
	</swiper-container>
</template>
