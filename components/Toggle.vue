<script setup lang="ts">
const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	horizontal: {
		type: Boolean,
		default: false,
	},
});

const combinedShow = `${props.horizontal ? "grid-cols-[1fr]" : "grid-rows-[1fr]"} opacity-100`;

const combinedHide = `${
	props.horizontal ? "grid-cols-[0fr]" : "grid-rows-[0fr]"
} overflow-hidden opacity-0`;

/** */
</script>

<template>
	<div
		class="grid"
		:class="props.show ? combinedShow : combinedHide"
		:style="{
			pointerEvents: props.show ? 'auto' : 'none',
			transitionProperty: 'grid-template-columns, grid-template-rows, opacity',
			transitionDuration: '150ms',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		}"
	>
		<div :class="props.horizontal ? 'min-w-0' : 'min-h-0'">
			<slot />
		</div>
	</div>
</template>
