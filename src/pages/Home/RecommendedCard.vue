<script setup lang="ts">
import Image from "../../components/ImagePoly.vue";
import "@material/web/chips/assist-chip.js";

const props = defineProps({
	coverImageUrl: { type: String, required: true },
	title: { type: String, required: true },
	pages: { type: Number, required: true },
	author: { type: String, required: true },
	isCompleted: { type: Number, required: true },
	isColored: { type: Number, required: true },
	releaseYear: { type: String, required: true },
	description: { type: String, required: true },
});

/** */
</script>

<template>
	<div
		class="relative flex h-full w-full flex-row justify-center bg-[rgb(248_216_255/0.7)] dark:bg-[rgb(116_0_160/0.7)] sm:static"
	>
		<!-- Background -->
		<div class="absolute left-0 top-0 z-[-1] hidden h-full w-full overflow-hidden sm:block">
			<Image
				src="https://cdn.jsdelivr.net/gh/Delnegend/assets/comic-bg.avif"
				format="avif"
				blurhash="T9N,}IWF%Nxu%M%M~q%MM{%M4nM|"
				:width="520"
				:height="735"
				:draggable="false"
				class="w-full scale-150 object-cover blur-sm"
			/>
		</div>

		<!-- Cover -->
		<div class="h-full w-full sm:min-w-[350px] sm:max-w-xs lg:py-10 lg:pl-10">
			<img
				:src="props.coverImageUrl"
				class="h-full w-full object-cover lg:rounded-2xl"
				draggable="false"
			/>
		</div>

		<!-- Infos for wide screen -->
		<div
			class="hidden max-w-3xl flex-col justify-start gap-3 overflow-y-auto sm:flex sm:max-h-[500px] sm:p-10"
		>
			<div>
				<div class="text-lg font-light">{{ props.author }}</div>
				<div class="truncate-2 mb-1 text-3xl font-bold">{{ props.title }}</div>
				<div>
					{{ props.releaseYear }} | {{ props.pages }} pages |
					{{ isColored == 1 ? "colored" : "monochrome" }}
				</div>
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<md-assist-chip v-for="i in 5" :key="i" :label="i.toString()" />
			</div>
			<div class="truncate-5 overflow-hidden">{{ props.description }}</div>
		</div>

		<!-- Info for small screen -->
		<div
			class="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-end gap-3 bg-[linear-gradient(to_bottom,rgba(248_216_255/0.3),rgba(248_216_255/1))] p-7 dark:bg-[linear-gradient(to_bottom,rgba(116_0_160/0.3),rgba(116_0_160/1))] sm:hidden"
		>
			<div>
				<div class="text-lg font-light">{{ props.author }}</div>
				<div class="truncate-2 text-2xl font-bold">{{ props.title }}</div>
			</div>
			<div class="text-sm">
				{{ props.releaseYear }} | {{ props.pages }} pages |
				{{ isColored == 1 ? "colored" : "monochrome" }}
			</div>
			<div
				class="overflow-hidden text-ellipsis"
				style="-webkit-line-clamp: 5; display: -webkit-box; -webkit-box-orient: vertical"
			>
				{{ props.description }}
			</div>
		</div>
	</div>
</template>
