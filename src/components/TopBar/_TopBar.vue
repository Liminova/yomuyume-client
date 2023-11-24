<script setup lang="ts">
import FilterBar from "./FilterBar.vue";
import LogoAndTitle from "./LogoAndTitle.vue";
import NavToggleIcon from "./NavToggleIcon.vue";
import UserAvatar from "./UserAvatar.vue";
import navigateToFilter from "../../utils/functions/navigateToFilter";
import { isTopBarVisible } from "../../utils/variables/store";

window.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.key === "k") {
		e.preventDefault();
		navigateToFilter();
	}
});
</script>

<template>
	<div
		class="sticky top-0 z-10 flex h-[--topbar-height] w-full flex-row items-center justify-between gap-2 bg-[--md-sys-color-surface] pr-4 transition-all"
		:class="isTopBarVisible ? 'translate-y-0' : '-translate-y-full'"
	>
		<!-- MavToggleButton, LogoTitle -->
		<div class="flex flex-row items-center justify-start">
			<NavToggleIcon />
			<LogoAndTitle />
		</div>

		<!-- Filter, Profile -->
		<div class="flex flex-row items-center justify-center gap-3">
			<FilterBar />
			<UserAvatar />
		</div>
	</div>
</template>
