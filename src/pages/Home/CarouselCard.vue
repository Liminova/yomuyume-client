<script setup lang="ts">
import CardBaseWithCover from "./CardBaseWithCover.vue";
import type MyImage from "../../utils/interfaces/MyImage";

const props = defineProps({
	artist: { type: String, required: true },
	cover: { type: Object as () => MyImage, required: true },
	language: { type: String, required: true },
	progress: { type: Number, default: 0 },
	title: { type: String, required: true },
});

/** */
</script>

<template>
	<CardBaseWithCover :cover="props.cover" :progress="progress">
		<div>
			<div class="mt-2 truncate text-sm font-light text-[--md-sys-color-on-surface]">
				{{ props.artist }}
			</div>
			<div
				class="truncate-2 text-balance text-lg font-bold text-[--md-sys-color-inverse-surface]"
			>
				<span v-show="props.language"
					>{{ props.language }} <i class="fa-regular fa-pipe"></i
				></span>
				{{ props.title }}
			</div>
		</div>
	</CardBaseWithCover>
</template>
