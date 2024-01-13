enum AuthScreen {
	Idle = "idle",
	Login = "login",
	Register = "register",
	Passwordless = "passwordless",
	ResetPassword = "resetPassword",
}

const authStore = defineStore("auth", () => {
	const screen = ref(AuthScreen.Login);
	const snackbarMessage = ref("");

	/**
	 * This exists because `parseRespJson`: `store.snackbarMessage` would just be
	 * a string, and not a reactive ref; vue's ref hoisting + nuxtjs = read-only
	 */

	function setSnackbarMessage(newVal: string) {
		snackbarMessage.value = newVal;
	}

	return { screen, snackbarMessage, setSnackbarMessage };
});

export { AuthScreen, authStore };
