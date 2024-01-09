<script setup lang="ts">
import NavDrawer from "./NavDrawer.vue";
import { isNavDrawerLarge, isTopBarVisible } from "../../utils/variables/store";
import TopBar from "../TopBar/_TopBar.vue";
import debounce from "debounce";
import { onMounted } from "vue";

const props = defineProps({
	class: { type: String, default: "" },
});

onMounted(() => {
	if (window.innerWidth < 1280) {
		isNavDrawerLarge.value = false;
	}

	let prevScrollPos = -document.body.getBoundingClientRect().top;

	function toggleTopBar() {
		if (window.innerWidth >= 1024) {
			isTopBarVisible.value = true;
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

	window.onscroll = debounce(toggleTopBar, 0);
	window.onresize = debounce(toggleTopBar, 100);
});
</script>

<template>
	<div>
		<TopBar />
		<div
			class="lg:grid lg:grid-cols-[0fr_1fr]"
			:class="isNavDrawerLarge ? 'lg:grid-cols-[360px_1fr]' : 'lg:grid-cols-[80px_1fr]'"
			:style="{ transition: 'grid-template-columns 300ms cubic-bezier(0.4, 0, 0.2, 1)' }"
		>
			<NavDrawer />
			<div
				class="lg:min-w-[0px]"
				:class="
					isNavDrawerLarge
						? 'lg:max-w-[calc(100vw-360px)]'
						: 'lg:max-w-[calc(100vw-80px)]'
				"
				:style="{ transition: 'max-width 300ms cubic-bezier(0.4, 0, 0.2, 1)' }"
			>
				<div :class="props.class">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>
