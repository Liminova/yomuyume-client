<script setup lang="ts">
import NavEntryLarge from "./NavEntryLarge.vue";
import ThemeToggle from "./ThemeToggle.vue";
import { Routes } from "../../router";
import { isNavDrawerLarge, vibrate } from "../../store";
import DividerBar from "../DividerBar.vue";
</script>

<!-- NOTE: DO NOT USE this component in any place other than NavDrawerWrapper.vue -->
<template>
	<div
		class="fixed left-0 top-[--topbar-height] z-[3] flex h-[calc(100vh-var(--topbar-height))] w-full flex-row overflow-y-auto overflow-x-hidden transition-all lg:sticky lg:block lg:max-w-[360px] lg:translate-x-0"
		:class="isNavDrawerLarge ? 'translate-x-0' : '-translate-x-full'"
	>
		<div
			class="flex h-full w-full max-w-[360px] flex-col justify-start rounded-br-[3rem] bg-[--md-sys-color-surface] shadow-2xl transition-all lg:w-full lg:rounded-none lg:shadow-none"
		>
			<NavEntryLarge name="Home" icon="fa-house" :target="Routes.Home" count="" />
			<NavEntryLarge
				name="Continue reading"
				icon="fa-rectangle-history"
				:target="Routes.ContinueReading"
				count="10"
			/>
			<NavEntryLarge
				name="Recently added"
				icon="fa-stars"
				:target="Routes.RecentlyAdded"
				count=""
			/>
			<NavEntryLarge
				name="Completed stories"
				icon="fa-check"
				:target="Routes.CompletedStories"
				count=""
			/>
			<NavEntryLarge
				name="Completed reading"
				icon="fa-check-to-slot"
				:target="Routes.CompletedReads"
				count=""
			/>
			<DividerBar />
			<ThemeToggle />
		</div>
		<div
			class="h-[calc(100vh-var(--top-bar-height))] w-full shrink-[100]"
			@click="vibrate() && (isNavDrawerLarge = false)"
		></div>
	</div>
</template>
