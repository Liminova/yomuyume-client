<script setup lang="ts">
import LogoAndTitle from "./LogoAndTitle.vue";
import NavToggleIcon from "./NavToggleIcon.vue";
import SearchBar from "./SearchBar.vue";
import UserAvatar from "./UserAvatar.vue";
import { vibrate, isTopBarVisible } from "../../utils/store";
</script>

<template>
	<div
		class="sticky top-0 z-10 flex h-[--topbar-height] w-full flex-row items-center justify-between gap-2 bg-[--md-sys-color-surface] pr-4 transition-all"
		:class="isTopBarVisible ? 'translate-y-0' : '-translate-y-full'"
	>
		<!-- MavToggleButton, LogoTitle -->
		<div class="flex flex-row items-center justify-start">
			<NavToggleIcon @click="vibrate" />
			<LogoAndTitle />
		</div>

		<!-- Search, Profile -->
		<div class="flex flex-row items-center justify-center gap-3">
			<SearchBar />
			<UserAvatar />
		</div>
	</div>
</template>
