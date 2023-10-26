<script setup lang="ts">
const props = defineProps({
	title: { type: String, required: true },
	artist: { type: String, required: true },
	coverImageUrl: { type: String, required: true },
});

/** */
</script>

<template>
	<div
		class="group absolute flex h-full w-full flex-col overflow-hidden rounded-xl border-[1px] border-[--md-sys-color-outline-variant]"
	>
		<img
			draggable="false"
			:src="props.coverImageUrl"
			class="left-0 top-0 h-[75%] w-full rounded-xl object-cover transition-all"
		/>
		<div class="p-4">
			<div class="mb-2 text-xl">{{ props.title }}</div>
			<div>
				by <span class="font-bold">{{ props.artist }}</span>
			</div>
		</div>
	</div>
</template>
