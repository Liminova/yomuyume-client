<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/text-button.js";
import { authState, AuthState } from "./authState";
import authApi from "../../api/auth";
import Toggle from "../../components/ToggleWrapper.vue";
import Routes from "../../utils/variables/routes";
import { State } from "../../utils/variables/store";
import { inject, ref } from "vue";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;

const usernameOrEmail = ref("");
const password = ref("");
const loginState = ref(State.Idle);
const loginErrorMsg = ref("Error: <msg from server>");

async function login(): Promise<void> {
	loginState.value = State.Loading;

	const result = await authApi.login(usernameOrEmail.value, password.value);

	if (!result.res.ok) {
		loginState.value = State.Error;
		loginErrorMsg.value = result.body.description;
		return;
	}

	loginState.value = State.Loaded;

	void router.push(Routes.Home);
}
</script>

<template>
	<!-- Input login -->
	<md-outlined-text-field
		v-model="usernameOrEmail"
		class="mb-3 w-full"
		label="Username or email"
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
	<Toggle :show="loginState === State.Error">
		<div class="mb-3 text-center">Error: {{ loginErrorMsg }}</div>
	</Toggle>

	<!-- Action button -->

	<div class="grid grid-cols-2 gap-2">
		<md-text-button
			class="w-full"
			:disabled="authState !== AuthState.Login"
			@click="authState = AuthState.Register"
		>
			New here? Register
		</md-text-button>
		<md-filled-tonal-button
			class="mb-3 w-full"
			:disabled="authState !== AuthState.Login"
			@click="login"
		>
			Login
		</md-filled-tonal-button>
	</div>
</template>
