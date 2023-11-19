<script setup lang="ts">
import { vibrate } from "../../utils/store";
</script>

<template>
	<router-link to="/" @click="vibrate">
		<div class="flex flex-row items-center justify-center gap-2">
			<div class="h-11 w-11">
				<img src="/favicon/apple-touch-icon.png" class="h-full w-full" />
			</div>
			<div
				class="hidden text-3xl text-neutral-500 md:block"
				style="font-family: Permanent Marker"
			>
				Yomuyume
			</div>
		</div>
	</router-link>
</template>
