<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import {
	email,
	fetchInstanceInfoState,
	isEmailValidState,
	loginCode,
	sendCodeState,
	loginState,
	isPasswordless,
} from "./states";
import Toggle from "../../components/ToggleWrapper.vue";
import { State } from "../../utils/variables/store";
import { ref, watchEffect } from "vue";

const sendCodeErrorMsg = ref("TODO: reason from server");

async function sendCode() {
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

function updateEmailAndStates(_email: string) {
	isEmailValidState.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(_email);
	sendCodeState.value = State.Idle;
	loginState.value = State.Idle;
	loginCode.value = "";
}

watchEffect(() => {
	updateEmailAndStates(email.value);
});
</script>

<template>
	<!-- Input email -->
	<Toggle :show="fetchInstanceInfoState === State.Loaded">
		<md-outlined-text-field
			v-model="email"
			label="Email"
			class="mb-3 w-full"
			:disabled="fetchInstanceInfoState !== State.Loaded || !isPasswordless"
			@keydown.enter="sendCode"
		/>
	</Toggle>

	<!-- Progress -->
	<Toggle :show="sendCodeState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>
	<Toggle :show="sendCodeState === State.Error">
		<div class="text-center">Error: {{ sendCodeErrorMsg }}</div>
	</Toggle>

	<!-- Send code button -->
	<Toggle :show="sendCodeState === State.Idle">
		<md-filled-tonal-button
			class="pointer-events-none w-full"
			:disabled="sendCodeState !== State.Idle || !isEmailValidState"
			@click="sendCode"
		>
			Send code
		</md-filled-tonal-button>
	</Toggle>
</template>
