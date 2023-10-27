<script setup lang="ts">
const props = defineProps({
	to: {
		type: String,
		required: true,
	},
});

/** */
</script>

<template>
	<router-link :to="props.to">
		<div
			class="absolute flex h-full w-full items-center justify-center overflow-hidden rounded-xl border-[1px] border-[--md-sys-color-outline-variant] text-2xl"
		>
			More of this
		</div>
	</router-link>
</template>
