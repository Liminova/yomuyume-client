<script setup lang="ts">
const props = defineProps({
	path: { type: String, required: true },
});

/** */
</script>

<template>
	<router-link
		:to="props.path"
		class="w-fit origin-left text-2xl font-medium transition-all hover:scale-[1.01]"
	>
		<div class="text-4xl font-bold">
			<slot />
		</div>
		<div class=""></div>
	</router-link>
</template>
