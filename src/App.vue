<script setup lang="ts">
import { reqWithAuth } from "./api/req";
import router from "./utils/variables/router";
import Routes from "./utils/variables/routes";
import { provide } from "vue";

if (localStorage.getItem("instance-address") === null) {
	void router.push(Routes.Auth);
}

void (async () => {
	const res = await reqWithAuth("/api/user/check", "GET");

	if (!res.ok) {
		void router.push(Routes.Auth);
	}
})();

provide("router", router);
</script>

<template>
	<router-view />
</template>
