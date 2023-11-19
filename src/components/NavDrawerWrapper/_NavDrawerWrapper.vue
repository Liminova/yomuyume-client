<script setup lang="ts">
import NavDrawer from "./NavDrawer.vue";
import { isNavDrawerLarge, isTopBarVisible } from "../../utils/store";
import TopBar from "../TopBar/_TopBar.vue";
import { debounce } from "debounce";
import { onMounted } from "vue";

const props = defineProps({
	class: { type: String, default: "" },
});

onMounted(() => {
	let prevScrollPos = -document.body.getBoundingClientRect().top;

	function toggleTopBar() {
		if (window.innerWidth >= 1024) {
			return;
		}

		const currentScrollPos = -document.body.getBoundingClientRect().top;

		if (prevScrollPos > currentScrollPos || currentScrollPos < 100) {
			isTopBarVisible.value = true;
		} else {
			isTopBarVisible.value = false;
			isNavDrawerLarge.value = false;
		}

		prevScrollPos = currentScrollPos;
	}

	window.onscroll = debounce(toggleTopBar, 100);
});
</script>

<template>
	<div class="flex flex-col">
		<TopBar />
		<NavDrawer />
		<div class="transition-all" :class="isNavDrawerLarge ? 'lg:ml-[360px]' : 'lg:ml-[80px]'">
			<div :class="props.class">
				<slot />
			</div>
		</div>
	</div>
</template>
