<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/text-button.js";
import { authState, AuthState, snackbarMessage } from "./authState";
import { req } from "../../api/req";
import Toggle from "../../components/ToggleWrapper.vue";
import parseRespJson from "../../utils/functions/parseRespJson";
import Routes from "../../utils/variables/routes";
import { State } from "../../utils/variables/store";
import { inject, ref } from "vue";
import type { GenericResponseBody } from "../../api/base";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;

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
		void parseRespJson(response, snackbarMessage).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				snackbarMessage.value = body.message;
			}
		});

		loginState.value = State.Error;
		return;
	}

	const body = (await parseRespJson(response, snackbarMessage)) as LoginResponseBody;

	localStorage.setItem("token", body.token);
	document.cookie = `token=${body.token}`;

	loginState.value = State.Loaded;

	void router.push(Routes.Home);
}
</script>

<template>
	<!-- Input login -->
	<md-outlined-text-field
		v-model="username"
		class="mb-3 w-full"
		label="Username"
		:disabled="authState !== AuthState.Login"
		@keydown.enter="login"
	/>

	<!-- Input password -->
	<md-outlined-text-field
		v-model="password"
		class="mb-3 w-full"
		type="password"
		label="Password"
		:disabled="authState !== AuthState.Login"
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
			:disabled="authState !== AuthState.Login"
			@click="login"
		>
			Login
		</md-filled-tonal-button>

		<md-text-button
			:disabled="authState !== AuthState.Login"
			@click="authState = AuthState.Register"
		>
			Register
		</md-text-button>

		<md-text-button
			:disabled="authState !== AuthState.Login"
			@click="authState = AuthState.ResetPassword"
		>
			Reset password
		</md-text-button>
	</div>
</template>
