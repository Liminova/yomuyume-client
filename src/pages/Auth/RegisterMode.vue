<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import { AuthState, authState } from "./authState";
import authApi from "../../api/auth";
import Toggle from "../../components/ToggleWrapper.vue";
import { State } from "../../utils/variables/store";
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordRetype = ref("");

const registerState = ref(State.Idle);
const registerErrorMsg = ref("");

async function register() {
	registerState.value = State.Loading;

	if (password.value !== passwordRetype.value) {
		registerErrorMsg.value = "Passwords do not match";
		registerState.value = State.Error;
		return;
	}

	// if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password.value)) {
	// 	registerErrorMsg.value = "Password must contains at least 8 characters, an uppercase letter, a lowercase letter and a number";
	// 	registerState.value = State.Error;
	// 	return;
	// }

	const result = await authApi.register(username.value, email.value, password.value);

	if (!result.res.ok) {
		registerErrorMsg.value = result.body.message;
		registerState.value = State.Error;
		return;
	}

	registerState.value = State.Loaded;

	authState.value = AuthState.Login;
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
	<Toggle :show="registerState === State.Error">
		<div class="mb-3 text-center">{{ registerErrorMsg }}</div>
	</Toggle>

	<md-filled-tonal-button
		class="w-full"
		:disabled="authState !== AuthState.Register"
		@click="register"
	>
		Register
	</md-filled-tonal-button>
</template>
