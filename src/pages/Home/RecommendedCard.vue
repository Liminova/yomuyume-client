<script setup lang="ts">
const props = defineProps({
	title: { type: String, required: true },
	releaseYear: { type: String, required: true },
	description: { type: String, required: true },
});

//
</script>

<template>
	<div class="h-full max-w-3xl overflow-hidden rounded-3xl bg-[--md-sys-color-primary-container]">
		<!-- Cover image -->
		<div class="h-full max-w-[50%]">
			<img src="https://picsum.photos/400/500" class="h-full object-cover" />
		</div>

		<div>{{ props.title }}</div>
		<div>{{ props.releaseYear }}</div>
		<div>{{ props.description }}</div>
	</div>
</template>
