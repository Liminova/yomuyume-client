<script setup lang="ts">
import { isNavDrawerLarge } from "../../store";
import { ref, watchEffect } from "vue";

const topBar = ref<HTMLElement | null>(null);
const middleBar = ref<HTMLElement | null>(null);
const bottomBar = ref<HTMLElement | null>(null);

watchEffect(() => {
	if (!topBar.value || !middleBar.value || !bottomBar.value) {
		return;
	}

	if (isNavDrawerLarge.value) {
		topBar.value.style.transform = "translateX(-2px)";
		middleBar.value.style.transform = "translateX(4px)";
		bottomBar.value.style.transform = "translateX(-2px)";
	} else {
		topBar.value.style.transform = "translateX(0)";
		middleBar.value.style.transform = "translateX(0)";
		bottomBar.value.style.transform = "translateX(0)";
	}
});
</script>

<template>
	<div
		class="relative mx-4 flex h-12 w-12 place-content-center place-items-center items-center justify-center overflow-hidden rounded-full"
	>
		<md-ripple></md-ripple>
		<input
			id="nav-toggle"
			v-model="isNavDrawerLarge"
			type="checkbox"
			class="absolute z-[1] h-12 w-12 opacity-0"
		/>
		<div class="absolute flex flex-col gap-2">
			<div
				ref="topBar"
				class="h-[1px] w-5 rounded-full bg-[--md-sys-color-on-surface] transition-all"
			></div>
			<div
				ref="middleBar"
				class="h-[1px] w-5 rounded-full bg-[--md-sys-color-on-surface] transition-all"
			></div>
			<div
				ref="bottomBar"
				class="h-[1px] w-5 rounded-full bg-[--md-sys-color-on-surface] transition-all"
			></div>
		</div>
	</div>
</template>
