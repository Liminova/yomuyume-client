<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/text-button.js";
import { authStore, AuthScreen } from "./authStore";
import State from "~/composables/enumResponseState";
import parseRespJson from "~/composables/functions/parseRespJson";

const store = authStore();
const username = ref("");
const password = ref("");
const loginState = ref(State.Idle);

type LoginResponseBody = {
	token: string;
	description: string;
};

async function login(): Promise<void> {
	loginState.value = State.Loading;

	const response = await req("/api/auth/login", "POST", {
		login: username.value,
		password: password.value,
	});

	if (!response.ok) {
		void parseRespJson(response, store.setSnackbarMessage).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				store.snackbarMessage = body.message;
			}
		});

		loginState.value = State.Error;
		return;
	}

	const body = (await parseRespJson(response, store.setSnackbarMessage)) as LoginResponseBody;

	localStorage.setItem("token", body.token);
	document.cookie = `token=${body.token}`;

	loginState.value = State.Loaded;

	await navigateTo("/");
}
</script>

<template>
	<!-- Input login -->
	<md-outlined-text-field
		v-model="username"
		class="mb-3 w-full"
		label="Username"
		:disabled="store.screen !== AuthScreen.Login"
		@keydown.enter="login"
	/>

	<!-- Input password -->
	<md-outlined-text-field
		v-model="password"
		class="mb-3 w-full"
		type="password"
		label="Password"
		:disabled="store.screen !== AuthScreen.Login"
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
			:disabled="store.screen !== AuthScreen.Login"
			@click="login"
		>
			Login
		</md-filled-tonal-button>

		<md-text-button
			:disabled="store.screen !== AuthScreen.Login"
			@click="store.screen = AuthScreen.Register"
		>
			Register
		</md-text-button>

		<md-text-button
			:disabled="store.screen !== AuthScreen.Login"
			@click="store.screen = AuthScreen.ResetPassword"
		>
			Reset password
		</md-text-button>
	</div>
</template>
