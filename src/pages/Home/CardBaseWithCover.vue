<script setup lang="ts">
import { coverHeight } from "./measurements";
import Image from "../../components/ImagePoly/_ImagePoly.vue";
import type MyImage from "../../utils/types/MyImage";
import "@material/web/progress/linear-progress.js";

const props = defineProps({
	cover: { type: Object as () => MyImage, required: true },
	progress: { type: Number, default: 0 },
});

/** */
</script>

<template>
	<swiper-slide class="flex flex-col items-start justify-center">
		<div class="img-cover group relative overflow-hidden rounded-xl">
			<Image
				:image="props.cover"
				:style="{
					height: coverHeight + 'px',
					transition: 'height 0.5s ease',
				}"
				image-class="rounded-xl h-full object-cover"
			/>
			<div
				class="absolute left-0 top-0 h-full w-full bg-[rgba(255_255_255/0.08)] opacity-0 transition-all group-[.img-cover]:hover:opacity-100"
			/>
			<md-linear-progress
				v-show="progress"
				:value="progress"
				class="absolute bottom-0 w-full"
			/>

			<i
				v-show="progress === 1"
				class="fa-solid fa-circle-check absolute right-2 top-1 text-xl text-[--md-sys-color-on-secondary-fixed-variant]"
			></i>
		</div>

		<slot />
	</swiper-slide>
</template>
