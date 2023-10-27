<script setup lang="ts">
import NavDrawerLarge from "./NavDrawerLarge/_NavDrawerLarge.vue";
import NavDrawerSmall from "./NavDrawerSmall/_NavDrawerSmall.vue";
import TopBar from "./TopBar/_TopBar.vue";
import { isNavDrawerLarge, isTopBarVisible } from "../store";
import { onMounted } from "vue";

const props = defineProps({
	class: { type: String, default: "" },
});

isTopBarVisible.value = true;
onMounted(() => {
	let prevScrollPos = window.pageYOffset;

	window.onscroll = () => {
		if (window.innerWidth >= 1024) {
			return;
		}

		const htmlElement = document.querySelector("html");

		if (htmlElement === null) {
			return;
		}

		const currentScrollPos = -htmlElement.getBoundingClientRect().top;

		if (prevScrollPos > currentScrollPos || currentScrollPos < 100) {
			isTopBarVisible.value = true;
		} else {
			isTopBarVisible.value = false;
			isNavDrawerLarge.value = false;
		}

		prevScrollPos = currentScrollPos;
	};
});
</script>

<template>
	<div>
		<TopBar />
		<div
			class="grid min-w-full transition-all"
			:class="isNavDrawerLarge ? 'lg:grid-cols-[360px_0_1fr]' : 'lg:grid-cols-[0_80px_1fr]'"
		>
			<NavDrawerLarge />
			<NavDrawerSmall />
			<div :class="props.class">
				<slot />
			</div>
		</div>
	</div>
</template>
