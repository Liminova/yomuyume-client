enum AuthScreen {
	Idle = "idle",
	Login = "login",
	Register = "register",
	Passwordless = "passwordless",
	ResetPassword = "resetPassword",
}

const authStore = reactive({
	screen: AuthScreen.Login,
	snackbarMessage: "",
});

export { AuthScreen, authStore };
