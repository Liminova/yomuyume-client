<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import { authState, AuthState } from "./authState";
import Toggle from "../../components/ToggleWrapper.vue";
import Routes from "../../utils/variables/routes";
import { State } from "../../utils/variables/store";
import { inject, ref } from "vue";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;

const sendCodeErrorMsg = ref("TODO: reason from server");

const email = ref("");
const sendCodeState = ref(State.Idle);

function sendCode() {
	// TODO: implement send code api
	sendCodeState.value = State.Loading;
	setTimeout(() => {
		// TODO: remove this on production
		if (email.value.includes("FORCE_ERROR")) {
			sendCodeState.value = State.Error;
			return;
		}

		sendCodeState.value = State.Loaded;
	}, 1000);
}

const loginCode = ref("");
const loginErrorMsg = ref("");
const loginState = ref(State.Idle);

function login() {
	// TODO: implement login api
	loginState.value = State.Loading;
	setTimeout(() => {
		// TODO: remove this on production
		if (loginCode.value.includes("FORCE_ERROR")) {
			loginState.value = State.Error;
			return;
		}

		loginState.value = State.Loaded;
		void router.push(Routes.Home);
	}, 1000);
}
</script>

<template>
	<!-- Input email -->
	<Toggle :show="authState === AuthState.Passwordless">
		<md-outlined-text-field
			v-model="email"
			label="Email"
			class="mb-3 w-full"
			:disabled="authState !== AuthState.Passwordless"
			@keydown.enter="sendCode"
		/>
	</Toggle>

	<!-- Visualize state -->
	<Toggle :show="sendCodeState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>
	<Toggle :show="sendCodeState === State.Error">
		<div class="text-center">Error: {{ sendCodeErrorMsg }}</div>
	</Toggle>

	<!-- Send code button -->
	<Toggle :show="sendCodeState === State.Idle">
		<md-filled-tonal-button
			class="w-full"
			:disabled="sendCodeState !== State.Idle || authState !== AuthState.Passwordless"
			@click="sendCode"
		>
			Send code
		</md-filled-tonal-button>
	</Toggle>

	<!-- Input code -->
	<Toggle :show="sendCodeState === State.Loaded">
		<md-outlined-text-field
			v-model="loginCode"
			class="mb-3 w-full"
			label="Verification code"
			:disabled="!(sendCodeState === State.Loaded)"
			@keydown.enter="login"
		/>
	</Toggle>

	<!-- Visualize state -->
	<Toggle :show="loginState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>
	<Toggle :show="loginState === State.Error">
		<div class="mb-3 text-center">Error: {{ loginErrorMsg }}</div>
	</Toggle>

	<!-- Login button -->
	<Toggle :show="sendCodeState === State.Loaded">
		<md-filled-tonal-button
			class="w-full"
			:disabled="sendCodeState !== State.Loaded"
			@click="login"
		>
			Login
		</md-filled-tonal-button>
	</Toggle>
</template>
