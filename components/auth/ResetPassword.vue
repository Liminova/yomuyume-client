<script setup lang="ts">
import "@material/web/button/text-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import { AuthScreen, authStore } from "./authStore";
import parseRespJson from "~/composables/functions/parseRespJson";

const store = authStore();
const email = ref("");
const token = ref("");
const tokenSent = ref(false);

async function sendToken() {
	const response = await req(`/api/user/reset/${email.value}`, "GET");

	if (!response.ok) {
		void parseRespJson(response, store.setSnackbarMessage).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				store.snackbarMessage = body.message;
			}
		});

		return;
	}

	tokenSent.value = true;
	store.snackbarMessage = "Token sent to your email";
}

async function reset() {
	const response = await req(`/api/user/reset`, "POST", undefined, {
		Authorization: `Bearer ${token.value}`,
	});

	if (!response.ok) {
		void parseRespJson(response, store.setSnackbarMessage).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				store.snackbarMessage = body.message;
			}
		});

		return;
	}

	store.screen = AuthScreen.Login;
	store.snackbarMessage = "Password reset successfully";
}
</script>

<template>
	<md-outlined-text-field
		v-model="email"
		class="mb-3 w-full"
		label="Email"
		:disabled="store.screen !== AuthScreen.ResetPassword"
		@keydown.enter="sendToken"
	/>

	<md-filled-tonal-button
		class="mb-3 w-full"
		:disabled="store.screen !== AuthScreen.ResetPassword"
		@click="sendToken"
	>
		Send token
	</md-filled-tonal-button>

	<md-outlined-text-field
		v-model="token"
		class="mb-3 w-full"
		label="Token"
		:disabled="store.screen !== AuthScreen.ResetPassword || !tokenSent"
		@keydown.enter="reset"
	/>

	<md-filled-tonal-button
		class="mb-1 w-full"
		:disabled="store.screen !== AuthScreen.ResetPassword || !tokenSent"
		@click="reset"
	>
		Reset password
	</md-filled-tonal-button>

	<md-text-button
		class="w-full"
		:disabled="store.screen !== AuthScreen.ResetPassword"
		@click="store.screen = AuthScreen.Login"
	>
		Back to login
	</md-text-button>
</template>
