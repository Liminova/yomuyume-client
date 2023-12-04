<script setup lang="ts">
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import { fetchInstanceInfoState } from "./states";
import Toggle from "../../components/ToggleWrapper.vue";
import { State } from "../../utils/variables/store";
import { ref } from "vue";

const userNameOrEmail = ref("");
const password = ref("");

const loginState = ref(State.Idle);
const loginErrorMsg = ref("Error: <msg from server>");

async function login(): Promise<void> {
	loginState.value = State.Loading;
	setTimeout(() => {
		loginState.value = State.Loaded;

		// TODO: implement login api
		// @ts-expect-error: Property 'click' DOES exist on type 'Element'.
		document.querySelector(".homeRoute")?.click();
	}, 1000);
}
</script>

<template>
	<md-outlined-text-field
		v-model="userNameOrEmail"
		class="mb-3 w-full"
		label="Username or email"
		:disable="fetchInstanceInfoState === State.Loaded"
		@keydown.enter="login"
	/>
	<md-outlined-text-field
		v-model="password"
		class="mb-3 w-full"
		type="password"
		label="Password"
		:disable="fetchInstanceInfoState === State.Loaded"
		@keydown.enter="login"
	/>

	<Toggle :show="loginState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>

	<Toggle :show="loginState === State.Error">
		<div class="mb-3 text-center">Error: {{ loginErrorMsg }}</div>
	</Toggle>

	<md-filled-tonal-button
		class="pointer-events-none w-full"
		:disable="fetchInstanceInfoState === State.Loaded"
		@click="login"
	>
		Login
	</md-filled-tonal-button>

	<router-link to="/" class="homeRoute hidden" />
</template>
