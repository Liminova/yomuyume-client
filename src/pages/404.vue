<script setup lang="ts">
import Routes from "../utils/variables/routes";
import { inject } from "vue";
import type { Router } from "vue-router";
const router = inject("router", {}) as Router;

/** */
</script>

<template>
	<div class="relative m-0 h-screen overflow-hidden bg-black">
		<img class="h-full w-full object-cover bg-black" src="/jerry.jpg" alt="jerry" />
		<button
			class="absolute left-0 top-0 h-full w-full bg-black/50 text-white"
			@click="router.push(Routes.Home)">
			Back to home
		</button>
	</div>
</template>