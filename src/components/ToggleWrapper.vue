<script setup lang="ts">
import { onMounted, ref } from "vue";

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

// Although the element appears to be hidden, it still inside the DOM
const container = ref<HTMLElement | null>(null);

onMounted(() => {
	let trials = 0;

	if (props.show) {
		return;
	}

	const interval = setInterval(() => {
		if (container.value === null || trials > 10) {
			trials++;
		} else {
			container.value.classList.add("hidden");
			clearInterval(interval);
		}
	}, 150);
});

/** */
</script>

<template>
	<div
		ref="container"
		class="grid transition-all"
		:class="props.show ? combinedShow : combinedHide"
	>
		<div :class="props.horizontal ? 'min-w-0' : 'min-h-0'">
			<slot />
		</div>
	</div>
</template>
