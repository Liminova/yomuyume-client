<script setup lang="ts">
import "@material/web/button/text-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import { AuthState, authState, snackbarMessage } from "./authState";
import { req } from "../../api/req";
import parseRespJson from "../../utils/functions/parseRespJson";
import { ref } from "vue";
import type { GenericResponseBody } from "../../api/base";

const email = ref("");
const token = ref("");
const tokenSent = ref(false);

async function sendToken() {
	const response = await req(`/api/user/reset/${email.value}`, "GET");

	if (!response.ok) {
		void parseRespJson(response, snackbarMessage).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				snackbarMessage.value = body.message;
			}
		});

		return;
	}

	tokenSent.value = true;
	snackbarMessage.value = "Token sent to your email";
}

async function reset() {
	const response = await req(`/api/user/reset`, "POST", undefined, {
		Authorization: `Bearer ${token.value}`,
	});

	if (!response.ok) {
		void parseRespJson(response, snackbarMessage).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				snackbarMessage.value = body.message;
			}
		});

		return;
	}

	authState.value = AuthState.Login;
	snackbarMessage.value = "Password reset successfully";
}
</script>

<template>
	<md-outlined-text-field
		v-model="email"
		class="mb-3 w-full"
		label="Email"
		:disabled="authState !== AuthState.ResetPassword"
		@keydown.enter="sendToken"
	/>

	<md-filled-tonal-button
		class="mb-3 w-full"
		:disabled="authState !== AuthState.ResetPassword"
		@click="sendToken"
	>
		Send token
	</md-filled-tonal-button>

	<md-outlined-text-field
		v-model="token"
		class="mb-3 w-full"
		label="Token"
		:disabled="authState !== AuthState.ResetPassword || !tokenSent"
		@keydown.enter="reset"
	/>

	<md-filled-tonal-button
		class="mb-1 w-full"
		:disabled="authState !== AuthState.ResetPassword || !tokenSent"
		@click="reset"
	>
		Reset password
	</md-filled-tonal-button>

	<md-text-button
		class="w-full"
		:disabled="authState !== AuthState.ResetPassword"
		@click="authState = AuthState.Login"
	>
		Back to login
	</md-text-button>
</template>
