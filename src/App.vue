<script setup lang="ts">
import router from "./utils/variables/router";
import Routes from "./utils/variables/routes";
import { provide } from "vue";

const cookies: Record<string, string> = (() => {
	const cookies: Record<string, string> = {};

	for (const cookie of document.cookie.split(";")) {
		const [key, value] = cookie.split("=");

		cookies[key.trim()] = value;
	}

	return cookies;
})();

if (localStorage.getItem("instance-address") === null || !cookies.session) {
	// TODO: remove this if false on production
	if (false) {
		void router.push(Routes.Auth);
	}
}

provide("router", router);
</script>

<template>
	<router-view />
</template>
