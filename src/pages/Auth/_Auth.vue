<script setup lang="ts">
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/progress/linear-progress.js";
import Toggle from "../../components/ToggleWrapper.vue";
import { State } from "../../utils/store";
import { ref } from "vue";

// Theme =======================================================================

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	window.document.documentElement.setAttribute("data-theme", "dark");
	window.document.documentElement.setAttribute("class", "dark");
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
	window.document.documentElement.setAttribute("data-theme", "light");
	window.document.documentElement.setAttribute("class", "light");
}

if (localStorage.getItem("instance-address") === null) {
	localStorage.setItem("instance-address", "https://yomuyume.delnegend.com");
}

// Instance address ============================================================

const instanceAddr = ref(localStorage.getItem("instance-address")!);
const instanceAddrChanged = ref(false);

function storeInstanceAddr() {
	instanceAddrChanged.value = true;
	localStorage.setItem("instance-address", instanceAddr.value);
}

const fetchServerInfoState = ref(State.Idle);

async function fetchServerInfo() {
	// TODO: implement fetch server info api

	if (!instanceAddrChanged.value) {
		return;
	}

	instanceAddrChanged.value = false;

	if (instanceAddr.value === "") {
		fetchServerInfoState.value = State.Idle;
		return;
	}

	fetchServerInfoState.value = State.Loading;

	setTimeout(() => {
		// TODO: remove this on production
		if (instanceAddr.value.includes("FORCE_ERROR")) {
			fetchServerInfoState.value = State.Error;
			return;
		}

		fetchServerInfoState.value = State.Loaded;
	}, 1000);
}

(async () => {
	instanceAddrChanged.value = true;
	await fetchServerInfo();
})().catch(() => {
	fetchServerInfoState.value = State.Error;
});

// Email =======================================================================

const email = ref("");
const isEmailValidState = ref(false);

function checkEmailValid() {
	sendCodeState.value = State.Idle;
	loginState.value = State.Idle;
	isEmailValidState.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email.value);
}

// Verification code ===========================================================

const sendCodeState = ref(State.Idle);
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

// Login =======================================================================

const loginCode = ref("");
const loginState = ref(State.Idle);
const loginErrorMsg = ref("TODO: reason from server");

async function login() {
	// TODO: implement login api
	loginState.value = State.Loading;
	setTimeout(() => {
		// TODO: remove this on production
		if (loginCode.value.includes("FORCE_ERROR")) {
			loginState.value = State.Error;
			return;
		}

		const goToHomeLink = ref<HTMLElement | null>(null);

		if (goToHomeLink.value !== null) {
			goToHomeLink.value.click();
		}
	}, 1000);
}
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<div class="flex w-80 flex-col transition-all">
			<!-- Input: instance address -->
			<md-outlined-text-field
				v-model="instanceAddr"
				label="Instance address"
				class="mb-3"
				@input="storeInstanceAddr"
				@focusout="fetchServerInfo"
			/>
			<Toggle :show="fetchServerInfoState === State.Loading">
				<md-linear-progress indeterminate class="mb-3 w-full"></md-linear-progress>
			</Toggle>
			<Toggle :show="fetchServerInfoState === State.Error">
				<div class="mb-3 text-center">Error: Failed to fetch server info</div>
			</Toggle>

			<Toggle :show="fetchServerInfoState === State.Loaded">
				<!-- Input: email -->
				<Toggle :show="fetchServerInfoState === State.Loaded">
					<md-outlined-text-field
						v-model="email"
						label="Email"
						class="mb-3 w-full"
						@input="checkEmailValid"
					/>
				</Toggle>

				<!-- Input: verification code -->
				<Toggle :show="sendCodeState === State.Loaded">
					<md-outlined-text-field
						v-model="loginCode"
						class="mb-3 w-full"
						label="Verification code"
					/>
				</Toggle>

				<!-- Send code button -->
				<Toggle :show="sendCodeState === State.Loading">
					<md-linear-progress indeterminate class="mb-3 w-full"></md-linear-progress>
				</Toggle>
				<Toggle :show="sendCodeState === State.Error">
					<div class="text-center">Error: {{ sendCodeErrorMsg }}</div>
				</Toggle>
				<Toggle :show="sendCodeState === State.Idle">
					<md-filled-tonal-button
						class="w-full"
						:disabled="!isEmailValidState"
						@click="sendCode"
					>
						Send code
					</md-filled-tonal-button>
				</Toggle>

				<!-- Login button -->
				<Toggle :show="loginState === State.Loading">
					<md-linear-progress indeterminate class="mb-3 w-full"></md-linear-progress>
				</Toggle>
				<Toggle :show="loginState === State.Error">
					<div class="mb-3 text-center">Error: {{ loginErrorMsg }}</div>
				</Toggle>
				<Toggle :show="sendCodeState === State.Loaded">
					<md-filled-tonal-button class="w-full" @click="login">
						Login
					</md-filled-tonal-button>
				</Toggle>
			</Toggle>
		</div>
	</div>
	<router-link ref="goToHomeLink" to="/" class="hidden"></router-link>
</template>
