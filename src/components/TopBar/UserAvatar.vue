<script setup lang="ts">
import "@material/web/ripple/ripple.js";
import { Routes } from "../../router";
import { vibrate } from "../../store";
</script>

<template>
	<router-link :to="Routes.AccountSettings" @click="vibrate">
		<div class="elevation-1 relative h-12 w-12 rounded-full">
			<md-ripple />
			<img src="/placeholder.svg" class="h-auto w-full rounded-full" />
		</div>
	</router-link>
</template>
