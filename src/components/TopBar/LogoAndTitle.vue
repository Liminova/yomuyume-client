<script setup lang="ts">
import { vibrate } from "../../store";
</script>

<template>
	<router-link to="/" @click="vibrate">
		<div class="flex flex-row items-center justify-center gap-2">
			<div class="h-11 w-11">
				<picture>
					<source srcset="/yomuyume.avif" class="h-auto w-full" type="image/avif" />
					<img src="/yomuyume.webp" class="h-auto w-full" />
				</picture>
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
