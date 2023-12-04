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
		class="grid transition-all"
		:class="props.show ? combinedShow : combinedHide"
		:style="{ pointerEvents: props.show ? 'auto' : 'none' }"
	>
		<div :class="props.horizontal ? 'min-w-0' : 'min-h-0'">
			<slot />
		</div>
	</div>
</template>
