<script setup lang="ts">
import NavDrawer from "./NavDrawer.vue";
import TopBar from "../TopBar/_TopBar.vue";
import { isNavDrawerLarge, isTopBarVisible } from "../../store";
import { onMounted } from "vue";

// import NavDrawerSmall from "./NavDrawerSmall/_NavDrawerSmall.vue";

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
			:class="isNavDrawerLarge ? 'lg:grid-cols-[360px_1fr]' : 'lg:grid-cols-[80px_1fr]'"
		>
			<NavDrawer />
			<div :class="props.class">
				<slot />
			</div>
		</div>
	</div>
</template>
