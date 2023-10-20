<script setup lang="ts">
import RecommendedCard from "./RecommendedCard.vue";

// import { VueperSlides, VueperSlide } from "vueperslides";
// import "vueperslides/dist/vueperslides.css";
</script>

<template>
	<div class="">
		<!-- <vueper-slides
            class="no-shadow"
            :visible-slides="3"
            :autoplay="true"
            :slide-ratio="1 / 4"
            slide-multiple
            :dragging-distance="70">
            <vueper-slide v-for="i in 10" :key="i">
                <template #content>
                </template>
            </vueper-slide>
        </vueper-slides> -->
		<RecommendedCard
			title="Zero Punch Man"
			release-year="2023"
			description="The story about the Zero Punch Man that might be better than One Punch Man"
		/>
	</div>
</template>
