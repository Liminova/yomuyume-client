<script setup lang="ts">
import { homeStore } from "./homeStore";

const store = homeStore();

/** */
</script>

<template>
	<swiper-container
		class="w-full overflow-hidden rounded-t-xl"
		:space-between="store.gapPixel"
		:slides-per-view="2"
		:breakpoints="swiperBreakpoints"
	>
		<slot />
	</swiper-container>
</template>
