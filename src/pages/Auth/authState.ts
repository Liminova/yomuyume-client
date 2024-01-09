import { ref } from "vue";

enum AuthState {
	Idle = "idle",
	Login = "login",
	Register = "register",
	Passwordless = "passwordless",
	ResetPassword = "resetPassword",
}

const snackbarMessage = ref("");

const authState = ref(AuthState.Login);

export { authState, AuthState, snackbarMessage };
