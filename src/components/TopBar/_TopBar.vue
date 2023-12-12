<script setup lang="ts">
import FilterBar from "./FilterBar.vue";
import LogoAndTitle from "./LogoAndTitle.vue";
import NavToggleIcon from "./NavToggleIcon.vue";
import UserAvatar from "./UserAvatar.vue";
import Routes from "../../utils/variables/routes";
import { isTopBarVisible } from "../../utils/variables/store";
import { inject } from "vue";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;

window.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.key === "k") {
		e.preventDefault();
		void router.push(Routes.Filter);
	}
});
</script>

<template>
	<div
		class="transition-bg-surface sticky top-0 z-10 flex h-[--topbar-height] w-full flex-row items-center justify-between gap-2 pr-4 transition-transform"
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
