<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import { loginCode, sendCodeState, loginState } from "./states";
import Toggle from "../../components/ToggleWrapper.vue";
import Routes from "../../utils/variables/routes";
import { State } from "../../utils/variables/store";
import { inject, ref } from "vue";
import type { Router } from "vue-router";

const loginErrorMsg = ref("");

const router = inject("router", {}) as Router;

async function login() {
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

	<!-- Progress -->
	<Toggle :show="loginState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>
	<Toggle :show="loginState === State.Error">
		<div class="mb-3 text-center">Error: {{ loginErrorMsg }}</div>
	</Toggle>

	<!-- Send code button -->
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
