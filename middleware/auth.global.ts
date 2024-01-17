export default defineNuxtRouteMiddleware(async (to, _) => {
	if (to.path === "/404") {
		return;
	}

	const { status } = await useFetch("/api/user/check", {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (to.path === "/auth" && status.value === "success") {
		return navigateTo("/");
	}

	if (status.value === "success") {
		return;
	}

	globalStore.token = "";

	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	if (to.path !== "/auth") {
		return navigateTo("/auth");
	}
});
