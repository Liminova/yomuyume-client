<script setup lang="ts">
import NavEntryLarge from "./NavEntryLarge.vue";
import ThemeToggle from "./ThemeToggle.vue";
import { Routes } from "../../store";
import DividerBar from "../DividerBar.vue";
</script>

<template>
	<div class="h-[calc(100vh-var(--topbar-height))] overflow-y-auto overflow-x-hidden">
		<div class="h-4"></div>
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
