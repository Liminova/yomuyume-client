<script setup lang="ts">
import { gapPixel } from "./store";
import { swiperBreakpoints } from "../../utils/variables/store";
</script>

<template>
	<swiper-container
		class="w-full overflow-hidden rounded-t-xl"
		:space-between="gapPixel"
		:slides-per-view="2"
		:breakpoints="swiperBreakpoints"
	>
		<slot />
	</swiper-container>
</template>
