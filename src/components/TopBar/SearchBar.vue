<script setup lang="ts">
import Routes from "../../utils/routes";
import { vibrate } from "../../utils/store";
import "@material/web/ripple/ripple.js";
</script>

<template>
	<router-link
		:to="Routes.Search"
		class="elevation-1 relative overflow-hidden rounded-full"
		@click="vibrate"
	>
		<md-ripple />
		<div
			class="w-xs hidden h-12 flex-row items-center justify-between rounded-full bg-[--md-sys-color-surface-container-high] pl-4 pr-3 md:flex"
		>
			<div class="flex w-full items-center justify-center gap-4">
				<i
					class="fa-regular fa-magnifying-glass text-xl text-[color:var(--md-sys-color-on-surface-variant)]"
				></i>
				<div
					class="bg-transparent pr-24 text-[color:var(--md-sys-color-primary-fixed-dim)]"
				>
					Ctrl + K
				</div>
			</div>
		</div>
		<div class="flex h-12 w-12 items-center justify-center md:hidden">
			<i
				class="fa-regular fa-magnifying-glass text-2xl text-[color:var(--md-sys-color-on-surface-variant)]"
			></i>
		</div>
	</router-link>
</template>
