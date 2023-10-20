<script setup lang="ts">
import NavEntrySmall from "./NavEntrySmall.vue";
import { Routes } from "../../store";
</script>

<template>
	<div class="flex flex-col items-center overflow-x-hidden">
		<NavEntrySmall name="Home" icon="fa-house" :target="Routes.Home" count="" />
		<NavEntrySmall icon="fa-stars" :target="Routes.RecentlyAdded" count="" />
		<NavEntrySmall icon="fa-rectangle-history" :target="Routes.ContinueReading" count="10" />
		<NavEntrySmall icon="fa-user" :target="Routes.AccountSettings" />
	</div>
</template>
