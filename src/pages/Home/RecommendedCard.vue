<script setup lang="ts">
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

function addDots(inputString: string, limit: number): string {
	return inputString.length > limit ? `${inputString.substring(0, limit)}...` : inputString;
}
</script>

<template>
	<div
		class="relative flex h-full w-full flex-row justify-center bg-[rgb(248_216_255/0.7)] dark:bg-[rgb(116_0_160/0.7)] sm:static"
	>
		<!-- Background -->
		<div class="absolute left-0 top-0 z-[-1] h-full w-full overflow-hidden">
			<img
				src="https://drive.google.com/uc?export=download&id=1MDf4aOzLoZzE0lpIeUXxsdV6ZOYSQibW"
				draggable="false"
				class="h-auto w-full scale-150 object-cover blur-sm"
			/>
		</div>

		<!-- Cover -->
		<div class="h-full sm:min-w-[350px] sm:max-w-xs lg:py-10 lg:pl-10">
			<img
				:src="props.coverImageUrl"
				class="h-full w-full object-cover lg:rounded-2xl"
				draggable="false"
			/>
		</div>

		<!-- Infos for wide screen -->
		<div
			class="hidden max-w-3xl flex-col justify-start gap-3 sm:flex sm:max-h-[500px] sm:overflow-y-auto sm:p-10"
		>
			<div>
				<div class="text-3xl font-bold">
					{{ props.title }}
				</div>
				<div class="text-lg">
					by <span class="font-bold">{{ props.author }}</span>
				</div>
			</div>
			<div>
				{{ props.releaseYear }} | {{ props.pages }} pages |
				{{ isColored == 1 ? "colored" : "monochrome" }}
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<md-assist-chip v-for="i in 5" :key="i" :label="i.toString()" />
			</div>
			<div class="">
				{{ props.description }}
			</div>
		</div>

		<!-- Info for small screen -->
		<div
			class="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-end gap-3 bg-[linear-gradient(to_bottom,rgba(248_216_255/0.3),rgba(248_216_255/1))] p-7 dark:bg-[linear-gradient(to_bottom,rgba(116_0_160/0.3),rgba(116_0_160/1))] sm:hidden"
		>
			<div>
				<div class="text-2xl font-bold">
					{{ props.title }}
				</div>
				<div class="text-lg">
					by <span class="font-bold">{{ props.author }}</span>
				</div>
			</div>
			<div class="text-sm">
				{{ props.releaseYear }} | {{ props.pages }} pages |
				{{ isColored == 1 ? "colored" : "monochrome" }}
			</div>
			<div class="overflow-hidden text-ellipsis">
				{{ addDots(props.description, 150) }}
			</div>
		</div>
	</div>
</template>
