export default defineNuxtRouteMiddleware(async (to, _) => {
	const response = await reqWithAuth("/api/user/check", "GET");

	if (to.path === "/auth" && response.ok) {
		return navigateTo("/");
	}

	if (response.ok) {
		return;
	}

	localStorage.removeItem("token");
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	if (to.path !== "/auth") {
		return navigateTo("/auth");
	}
});
