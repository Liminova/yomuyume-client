<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/text-button.js";
import { AuthState, authState, snackbarMessage } from "./authState";
import { req } from "../../api/req";
import Toggle from "../../components/ToggleWrapper.vue";
import parseRespJson from "../../utils/functions/parseRespJson";
import { State } from "../../utils/variables/store";
import { ref } from "vue";
import type { GenericResponseBody } from "../../api/base";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordRetype = ref("");

const registerState = ref(State.Idle);

async function register() {
	registerState.value = State.Loading;

	// client-side validation
	if (password.value !== passwordRetype.value) {
		snackbarMessage.value = "Passwords do not match";
		registerState.value = State.Error;
		return;
	}

	if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/u.test(password.value)) {
		snackbarMessage.value =
			"Password must contains at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character";
		registerState.value = State.Error;
		return;
	}

	const response = await req("/api/auth/register", "POST", {
		username: username.value,
		email: email.value,
		password: password.value,
	});

	if (response.ok) {
		registerState.value = State.Loaded;
		authState.value = AuthState.Login;
		return;
	}

	void parseRespJson(response, snackbarMessage).then((body_) => {
		const body = body_ as GenericResponseBody;

		if (body.message) {
			snackbarMessage.value = body.message;
		}
	});
	registerState.value = State.Error;
}
</script>

<template>
	<md-outlined-text-field
		v-model="username"
		class="mb-3 w-full"
		type="text"
		label="Username"
		:disabled="authState !== AuthState.Register"
	/>

	<md-outlined-text-field
		v-model="email"
		class="mb-3 w-full"
		type="email"
		label="Email"
		:disabled="authState !== AuthState.Register"
	/>

	<md-outlined-text-field
		v-model="password"
		class="mb-3 w-full"
		type="password"
		label="Password"
		:disabled="authState !== AuthState.Register"
	/>

	<md-outlined-text-field
		v-model="passwordRetype"
		class="mb-3 w-full"
		type="password"
		label="Retype password"
		:disabled="authState !== AuthState.Register"
		@keydown.enter="register"
	/>

	<Toggle :show="registerState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>

	<div class="grid grid-cols-2 gap-2">
		<md-text-button
			class="w-full"
			:disabled="authState !== AuthState.Register"
			@click="authState = AuthState.Login"
		>
			Back to login
		</md-text-button>
		<md-filled-tonal-button
			class="w-full"
			:disabled="authState !== AuthState.Register"
			@click="register"
		>
			Register
		</md-filled-tonal-button>
	</div>
</template>
