<script setup lang="ts">
import NavEntryLarge from "./NavEntry.vue";
import ThemeToggle from "./ThemeToggle.vue";
import Routes from "../../routes";
import { isNavDrawerLarge as isNavOpen, vibrate } from "../../store";
import DividerBar from "../DividerBar.vue";
import Toggle from "../ToggleWrapper.vue";
</script>

<!-- NOTE: DO NOT USE this component in any place other than NavDrawerWrapper.vue -->
<template>
	<div
		class="fixed left-0 top-[--topbar-height] z-10 flex h-[calc(100vh-var(--topbar-height))] w-full flex-row overflow-y-auto transition-all lg:sticky lg:block lg:max-w-[360px] lg:translate-x-0"
		:class="isNavOpen ? 'translate-x-0' : '-translate-x-[360px]'"
	>
		<div
			class="flex h-full w-full max-w-[360px] flex-col justify-start rounded-br-[3rem] bg-[--md-sys-color-surface] shadow-2xl transition-all lg:w-full lg:rounded-none lg:shadow-none"
		>
			<NavEntryLarge name="Home" icon="fa-house" :target="Routes.Home" count="" />
			<NavEntryLarge name="Library" icon="fa-book" :target="Routes.Library" count="" />
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
			<Toggle :show="isNavOpen">
				<DividerBar />
				<ThemeToggle />
			</Toggle>
		</div>
		<div
			class="h-[calc(100vh-var(--top-bar-height))] w-full shrink-[100]"
			:class="isNavOpen ? 'block' : 'hidden'"
			@click="vibrate() && (isNavOpen = false)"
		></div>
	</div>
</template>
