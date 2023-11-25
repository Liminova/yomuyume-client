<script setup lang="ts">
import { recommendsContainerHeight } from "./measurements";
import Image from "../../components/ImagePoly/_ImagePoly.vue";
import AverageColorWorker from "../../workers/fastAverageColor?worker";
import { ref } from "vue";
import type MyImage from "../../utils/interfaces/MyImage";
import "@material/web/chips/assist-chip.js";

const props = defineProps({
	artist: { type: String, required: true },
	coverImage: { type: Object as () => MyImage, required: true },
	description: { type: String, required: true },
	isCompleted: { type: Boolean, required: true },
	randomPage: { type: Object as () => MyImage, required: true },
	tags: { type: Array as () => Array<string>, required: true },
	title: { type: String, required: true },
	isFirstItem: { type: Boolean, default: true },
	isLastItem: { type: Boolean, default: false },
});

const averageColorWorker = new AverageColorWorker();
const previewBgColorSolid = ref("var(--md-sys-color-surface-dark)");
const previewBgColorGradient = ref("var(--md-sys-color-surface-dark)");

averageColorWorker.onmessage = (event: MessageEvent<{ solid: string; gradient: string }>) => {
	previewBgColorSolid.value = event.data.solid;
	previewBgColorGradient.value = event.data.gradient;
};

const handleSendMessage = (value: string) => {
	averageColorWorker.postMessage(value);
};

/** */
</script>

<template>
	<div
		class="recommend-container relative flex h-full flex-row justify-center overflow-hidden sm:static"
		:class="{ 'rounded-l-3xl': props.isFirstItem, 'rounded-r-3xl': props.isLastItem }"
		:style="{
			'background-color': previewBgColorSolid,
			transition: 'background-color 0.5s ease',
		}"
	>
		<!-- Background -->
		<div
			class="absolute left-0 top-0 z-[-1] hidden w-full overflow-hidden sm:block"
			:class="{ 'rounded-l-3xl': props.isFirstItem, 'rounded-r-3xl': props.isLastItem }"
			:style="{ height: `${recommendsContainerHeight}px` }"
		>
			<Image
				class="w-full scale-110 overflow-hidden object-cover blur-sm"
				:draggable="false"
				:image="props.randomPage"
				image-class="overflow-hidden"
				:lazy="false"
			/>
		</div>

		<!-- Cover -->
		<div class="h-full w-full sm:min-w-[350px] sm:max-w-xs lg:py-10 lg:pl-10">
			<Image
				:draggable="false"
				:image="props.coverImage"
				class="h-full overflow-hidden lg:rounded-2xl"
				image-class="h-full object-cover"
				emit-rendered-img-blob-url
				@send-message="handleSendMessage"
			/>
		</div>

		<div
			class="pointer-events-none absolute left-0 top-0 flex h-full w-full sm:hidden"
			:style="{ background: previewBgColorGradient, transition: 'background 0.5s ease' }"
		/>

		<div
			class="absolute left-0 top-0 z-[1] flex h-full w-full flex-col justify-end p-7 sm:static sm:z-auto sm:max-w-3xl sm:justify-start sm:bg-transparent sm:p-10"
		>
			<div class="text-lg font-light" data-theme="dark">
				{{ props.artist }}
			</div>
			<div class="truncate-2 text-balance mb-1 text-3xl font-bold" data-theme="dark">
				{{ props.title }}
			</div>

			<div v-if="props.isCompleted" class="mb-2" data-theme="dark">
				<i class="fa-solid fa-circle-check mr-2" />
				<span>Completed</span>
			</div>

			<div class="mb-2 hidden flex-row flex-wrap gap-2 sm:flex">
				<md-assist-chip v-for="tag in tags" :key="tag" :label="tag" class="elevation-3" />
			</div>

			<div class="truncate-5 sm:truncate-8 z-[1] overflow-hidden" data-theme="dark">
				{{ props.description }}
			</div>
		</div>
	</div>
</template>
