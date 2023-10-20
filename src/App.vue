<script setup lang="ts">
import NavDrawerLarge from "./components/NavDrawerLarge/_NavDrawerLarge.vue";
import NavDrawerSmall from "./components/NavDrawerSmall/_NavDrawerSmall.vue";
import TopBar from "./components/TopBar/_TopBar.vue";
import { isNavDrawerLarge } from "./store";

if (window.innerWidth < 1280) {
	isNavDrawerLarge.value = false;
}
</script>

<template>
	<TopBar />
	<div
		class="grid min-w-full transition-all"
		:class="isNavDrawerLarge ? 'lg:grid-cols-[360px_0_1fr]' : 'lg:grid-cols-[0_80px_1fr]'"
	>
		<NavDrawerLarge
			class="fixed left-0 top-[--topbar-height] w-full max-w-[360px] bg-[--md-sys-color-surface] transition-all lg:static lg:top-0 lg:block lg:translate-x-0"
			:class="isNavDrawerLarge ? 'translate-x-0' : '-translate-x-full'"
		/>
		<NavDrawerSmall class="hidden lg:flex" />
		<div class="flex flex-col px-6 transition-all lg:pl-0">
			<router-view></router-view>
		</div>
	</div>
</template>
