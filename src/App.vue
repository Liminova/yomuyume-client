<script setup lang="ts">
import router from "./utils/variables/router";

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
		router.push("/auth").catch(() => {
			/** */
		});
	}
}

/** */
</script>

<template>
	<router-view />
</template>
