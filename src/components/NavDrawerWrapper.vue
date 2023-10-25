<script setup lang="ts">
import NavDrawerLarge from "./NavDrawerLarge/_NavDrawerLarge.vue";
import NavDrawerSmall from "./NavDrawerSmall/_NavDrawerSmall.vue";
import TopBar from "./TopBar/_TopBar.vue";
import { isNavDrawerLarge } from "../store";

const props = defineProps({
	class: { type: String, default: "" },
});

/** */
</script>

<template>
	<div>
		<TopBar />
		<div
			class="grid min-w-full transition-all"
			:class="isNavDrawerLarge ? 'lg:grid-cols-[360px_0_1fr]' : 'lg:grid-cols-[0_80px_1fr]'"
		>
			<NavDrawerLarge></NavDrawerLarge>
			<NavDrawerSmall />
			<div :class="props.class">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
