<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/text-button.js";
import { authStore, AuthScreen } from "./authStore";
import State from "~/composables/enumResponseState";

const username = ref("");
const password = ref("");
const loginState = ref(State.Idle);

async function login(): Promise<void> {
	const checkPassword = isStrongPassword(password.value);

	if (!checkPassword.isStrong) {
		authStore.snackbarMessage = checkPassword.message;
		loginState.value = State.Error;
		return;
	}

	loginState.value = State.Loading;

	const { status, token, message } = await authApi.login({
		login: username.value,
		password: password.value,
	});

	if (status === "error") {
		authStore.snackbarMessage = message;
		loginState.value = State.Error;
		return;
	}

	globalStore.token = token;
	loginState.value = State.Loaded;

	const serverAddr = new URL("/", globalStore.instanceAddr).toString();
	const clientAddr = new URL("/", window.location.href).toString();

	if (clientAddr === serverAddr) {
		await navigateTo("/");
		return;
	}

	/* eslint-disable-next-line no-console */
	console.warn(
		"Warning: client and server address are on different domains. Cookie will be set manually."
	);

	let exp = 0;

	try {
		exp = (JSON.parse(atob(token.split(".")[1])) as { exp: number }).exp;
	} catch {
		authStore.snackbarMessage = "Cannot parse token";
		loginState.value = State.Error;
		return;
	}

	document.cookie = `token=${token}; expires=${new Date(exp * 1000).toUTCString()}; path=/`;
	await navigateTo("/");
}
</script>

<template>
	<Snackbar :message="authStore.snackbarMessage" @close="authStore.snackbarMessage = ''" />

	<!-- Input login -->
	<md-outlined-text-field
		v-model="username"
		class="mb-3 w-full"
		label="Username"
		:disabled="authStore.screen !== AuthScreen.Login"
		@keydown.enter="login"
	/>

	<!-- Input password -->
	<md-outlined-text-field
		v-model="password"
		class="mb-3 w-full"
		type="password"
		label="Password"
		:disabled="authStore.screen !== AuthScreen.Login"
		@keydown.enter="login"
	/>

	<!-- Visualize state -->
	<Toggle :show="loginState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>

	<!-- Buttons -->
	<div class="grid grid-cols-2 gap-1">
		<md-filled-tonal-button
			class="col-span-2"
			:disabled="authStore.screen !== AuthScreen.Login"
			@click="login"
		>
			Login
		</md-filled-tonal-button>

		<md-text-button
			:disabled="authStore.screen !== AuthScreen.Login"
			@click="authStore.screen = AuthScreen.Register"
		>
			Register
		</md-text-button>

		<md-text-button
			:disabled="authStore.screen !== AuthScreen.Login"
			@click="authStore.screen = AuthScreen.ResetPassword"
		>
			Reset password
		</md-text-button>
	</div>
</template>
