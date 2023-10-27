<script setup lang="ts">
import NavEntrySmall from "./NavEntrySmall.vue";
import Routes from "../../routes";
import { isNavDrawerLarge, isTopBarVisible } from "../../store";
import DividerBar from "../DividerBar.vue";
</script>

<!-- NOTE: DO NOT USE this component in any place other than NavDrawerWrapper.vue -->
<template>
	<div
		class="sticky z-10 hidden max-h-[calc(100vh-var(--topbar-height))] flex-col items-center lg:flex"
		:class="
			(isNavDrawerLarge ? 'overflow-x-hidden ' : ' ') +
			(isTopBarVisible ? 'lg:top-[--topbar-height]' : 'top-0 pt-3')
		"
	>
		<NavEntrySmall name="Home" icon="fa-house" :target="Routes.Home" count="" />
		<NavEntrySmall
			name="Continue reading"
			icon="fa-rectangle-history"
			:target="Routes.ContinueReading"
			count="10"
		/>
		<NavEntrySmall
			name="Recently added"
			icon="fa-stars"
			:target="Routes.RecentlyAdded"
			count=""
		/>
		<DividerBar class="w-10" />
	</div>
</template>
