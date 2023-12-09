<script setup lang="ts">
import ImagePoly from "./ImagePoly/_ImagePoly.vue";
import type MyImage from "../utils/types/MyImage";

const props = defineProps({
	itemUuid: { type: String, required: true },
	author: { type: String, required: true },
	cover: { type: Object as () => MyImage, required: true },
	coverHeight: { type: Number, required: true },
	progress: { type: Number, default: 0 },
	title: { type: String, required: true },
});

/** */
</script>

<template>
	<router-link class="flex flex-col items-start justify-center" :to="`/item/${props.itemUuid}`">
		<div class="img-cover group relative overflow-hidden rounded-xl">
			<ImagePoly
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
		<div>
			<div class="mt-2 truncate text-sm font-light text-[--md-sys-color-on-surface]">
				{{ props.author }}
			</div>
			<div
				class="truncate-2 text-balance text-lg font-bold text-[--md-sys-color-inverse-surface]"
			>
				{{ props.title }}
			</div>
		</div>
	</router-link>
</template>
