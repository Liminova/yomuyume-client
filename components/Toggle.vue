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

const showClass = props.horizontal ? "show-horizontal" : "show-vertical";
const hideClass = props.horizontal ? "hide-horizontal" : "hide-vertical";

const isShowing = ref(props.show);

watchEffect(() => {
	if (props.show) {
		isShowing.value = true;
	}
});
</script>

<template>
	<div
		v-if="isShowing"
		ref="container"
		class="grid"
		:class="props.show ? showClass : hideClass"
		:style="{
			pointerEvents: props.show ? 'auto' : 'none',
			transitionProperty: 'grid-template-columns, grid-template-rows, opacity',
			transitionDuration: '150ms',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		}"
		@transitionend="isShowing = props.show"
	>
		<div :class="props.horizontal ? 'min-w-0' : 'min-h-0'">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.show-vertical {
	opacity: 1;
	grid-template-rows: 1fr;
}
.show-horizontal {
	opacity: 1;
	grid-template-columns: 1fr;
}
.hide-vertical {
	opacity: 0;
	grid-template-rows: 0fr;
}
.hide-horizontal {
	opacity: 0;
	grid-template-columns: 0fr;
}
</style>
