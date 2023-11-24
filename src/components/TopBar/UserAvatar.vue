<script setup lang="ts">
import "@material/web/ripple/ripple.js";

import Routes from "../../utils/variables/routes";
</script>

<template>
	<div class="elevation-1 group relative h-12 w-12 rounded-full">
		<img src="/placeholder.svg" class="h-auto w-full rounded-full" />

		<div
			class="pointer-events-none absolute right-0 top-7 grid -translate-y-6 grid-rows-[0fr] rounded-2xl opacity-0 transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
		>
			<div class="elevation-3 mt-8 flex flex-col gap-3 rounded-2xl p-5">
				<router-link :to="Routes.Settings">
					<div
						class="whitespace-nowrap text-[--md-sys-color-on-surface-variant] transition-all hover:text-[--md-sys-color-on-surface] dark:hover:text-[--md-sys-color-primary-fixed]"
					>
						Settings
					</div>
				</router-link>
				<div
					class="whitespace-nowrap text-[--md-sys-color-on-surface-variant] transition-all hover:text-[--md-sys-color-on-surface] dark:hover:text-[--md-sys-color-primary-fixed]"
				>
					Sign out
				</div>
			</div>
		</div>
	</div>
</template>
