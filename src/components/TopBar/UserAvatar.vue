<script setup lang="ts">
import "@material/web/ripple/ripple.js";

import Routes from "../../utils/routes";
import { vibrate } from "../../utils/store";
</script>

<template>
	<div class="elevation-1 group relative h-12 w-12 rounded-full">
		<img src="/placeholder.svg" class="h-auto w-full rounded-full" />

		<div
			class="absolute right-0 top-7 grid grid-rows-[0fr] overflow-hidden rounded-2xl transition-all group-hover:grid-rows-[1fr]"
		>
			<div class="min-h-0">
				<div class="elevation-3 mt-8 flex flex-col gap-3 rounded-2xl p-5">
					<router-link :to="Routes.AccountSettings" @click="vibrate">
						<div
							class="whitespace-nowrap text-[--md-sys-color-primary-fixed-dim] transition-all hover:text-[--md-sys-color-primary-fixed]"
						>
							Settings
						</div>
					</router-link>
					<div
						class="whitespace-nowrap text-[--md-sys-color-primary-fixed-dim] transition-all hover:text-[--md-sys-color-primary-fixed]"
					>
						Sign out
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
