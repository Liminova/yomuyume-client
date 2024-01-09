<script setup lang="ts">
import { recommendsContainerHeight } from "./measurements";
import Image from "../../components/ImagePoly/_ImagePoly.vue";
import type MyImage from "../../utils/types/MyImage";
import "@material/web/chips/assist-chip.js";

const props = defineProps({
	author: { type: String, required: true },
	cover: { type: Object as () => MyImage, required: true },
	description: { type: String, required: true },
	tags: { type: Array as () => Array<string>, required: true },
	title: { type: String, required: true },
	isFirstTitle: { type: Boolean, default: true },
	isLastTitle: { type: Boolean, default: false },
	titleId: { type: String, required: true },
});

/** */
</script>

<template>
	<router-link
		:to="`/title/${props.titleId}`"
		class="recommend-container relative flex h-full flex-row justify-center overflow-hidden bg-black/50 sm:static"
		:class="{ 'rounded-l-3xl': props.isFirstTitle, 'rounded-r-3xl': props.isLastTitle }"
	>
		<!-- Background -->
		<div
			class="absolute left-0 top-0 z-[-1] hidden w-full overflow-hidden sm:block"
			:class="{ 'rounded-l-3xl': props.isFirstTitle, 'rounded-r-3xl': props.isLastTitle }"
			:style="{ height: `${recommendsContainerHeight}px` }"
		>
			<Image
				class="w-full scale-110 overflow-hidden object-cover blur-sm"
				:draggable="false"
				:image="props.cover"
				image-class="overflow-hidden"
				:lazy="false"
			/>
		</div>

		<!-- Cover -->
		<div class="h-full w-full sm:min-w-[350px] sm:max-w-xs lg:py-10 lg:pl-10">
			<Image
				:draggable="false"
				:image="props.cover"
				class="h-full overflow-hidden lg:rounded-2xl"
				image-class="h-full object-cover"
			/>
		</div>

		<div
			class="pointer-events-none absolute left-0 top-0 flex h-full w-full bg-black/50 sm:hidden"
		/>

		<div
			class="absolute left-0 top-0 z-[1] flex h-full w-full flex-col justify-end p-7 sm:static sm:z-auto sm:max-w-3xl sm:justify-start sm:bg-transparent sm:p-10"
		>
			<div class="text-lg font-light" data-theme="dark">
				{{ props.author }}
			</div>
			<div class="truncate-2 text-balance mb-1 text-3xl font-bold" data-theme="dark">
				{{ props.title }}
			</div>

			<div v-if="props.tags.includes(`completed`)" class="mb-2" data-theme="dark">
				<i class="fa-solid fa-circle-check mr-2" />
				<span>Completed</span>
			</div>

			<div class="mb-2 hidden flex-row flex-wrap gap-2 sm:flex">
				<router-link v-for="tag in tags" :key="tag" :to="`/filter/tags=${tag}`">
					<md-assist-chip :key="tag" :label="tag" class="elevation-3" />
				</router-link>
			</div>

			<div class="truncate-5 sm:truncate-8 z-[1] overflow-hidden" data-theme="dark">
				{{ props.description }}
			</div>
		</div>
	</router-link>
</template>
