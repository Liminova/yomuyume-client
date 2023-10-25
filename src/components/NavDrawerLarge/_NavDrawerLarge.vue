<script setup lang="ts">
import NavEntryLarge from "./NavEntryLarge.vue";
import ThemeToggle from "./ThemeToggle.vue";
import { Routes } from "../../router";
import { isNavDrawerLarge } from "../../store";
import DividerBar from "../DividerBar.vue";
</script>

<!-- NOTE: DO NOT USE this component in any place other than NavDrawerWrapper.vue -->
<template>
	<div
		class="fixed left-0 top-[--topbar-height] z-[1] h-[calc(100vh-var(--topbar-height))] w-full max-w-[360px] overflow-y-auto overflow-x-hidden rounded-br-[3rem] bg-[--md-sys-color-surface] shadow-2xl transition-all lg:sticky lg:block lg:translate-x-0 lg:bg-transparent lg:shadow-none"
		:class="isNavDrawerLarge ? 'translate-x-0' : '-translate-x-full'"
	>
		<div class="flex flex-col justify-between">
			<NavEntryLarge name="Home" icon="fa-house" :target="Routes.Home" count="" />
			<NavEntryLarge
				name="Recently added"
				icon="fa-stars"
				:target="Routes.RecentlyAdded"
				count=""
			/>
			<NavEntryLarge
				name="Continue reading"
				icon="fa-rectangle-history"
				:target="Routes.ContinueReading"
				count="10"
			/>
			<DividerBar />
			<NavEntryLarge
				name="Account settings"
				icon="fa-user"
				:target="Routes.AccountSettings"
			/>
			<DividerBar />
			<ThemeToggle />
		</div>
	</div>
</template>
