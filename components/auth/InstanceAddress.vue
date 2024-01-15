<script setup lang="ts">
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import { authStore, AuthScreen } from "./authStore";
import State from "~/composables/enumResponseState";

const serverVersion = ref("");
const fetchServerState = ref(State.Idle);
const hideServerAddrChange = ref(false);

async function fetchInstanceInfo(_instanceAddr = globalStore.instanceAddr) {
	authStore.screen = AuthScreen.Idle;

	if (_instanceAddr === "") {
		fetchServerState.value = State.Idle;
		return Promise.resolve();
	}

	fetchServerState.value = State.Loading;

	const result = await utilsApi.status();

	if (result.status === "error") {
		fetchServerState.value = State.Error;
		return Promise.reject(new Error(""));
	}

	if (result.data.password_less !== undefined && result.data.password_less) {
		authStore.screen = AuthScreen.Passwordless;
	} else {
		authStore.screen = AuthScreen.Login;
	}

	fetchServerState.value = State.Loaded;
	serverVersion.value = result.data.version;
	hideServerAddrChange.value = true;
	return Promise.resolve();
}

function instanceAddrChanged(_instanceAddr: string = globalStore.instanceAddr) {
	globalStore.instanceAddr = _instanceAddr;
	fetchServerState.value = State.Loading;
	fetchInstanceInfo(_instanceAddr)
		.then(() => {
			localStorage.setItem("instance-address", _instanceAddr);
		})
		.catch(() => (fetchServerState.value = State.Error));
}

if (window.location.hostname !== "localhost") {
	instanceAddrChanged(`https://${window.location.hostname}`);
}

const instanceAddrLocal = localStorage.getItem("instance-address");

if (instanceAddrLocal !== null) {
	instanceAddrChanged(instanceAddrLocal);
}

fetchInstanceInfo().catch(() => {
	fetchServerState.value = State.Error;
});

async function check() {
	const { status } = await useFetch("/api/user/check", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "success") {
		await navigateTo("/auth");
	}
}

void check();
</script>

<template>
	<Toggle class="mx-auto mb-3" :show="fetchServerState === State.Loaded">
		<div>{{ serverVersion }}</div>
	</Toggle>

	<Toggle :show="!hideServerAddrChange">
		<!-- Input + Check instance addr -->
		<md-outlined-text-field
			v-model="globalStore.instanceAddr"
			label="Instance address"
			class="mb-3 w-full"
			@keydown.enter="instanceAddrChanged()"
		/>
		<Toggle :show="fetchServerState !== State.Loaded">
			<md-filled-tonal-button
				class="mb-3 w-full"
				:disabled="fetchServerState === State.Loaded"
				@click="instanceAddrChanged()"
			>
				Check
			</md-filled-tonal-button>
		</Toggle>

		<!-- Visualize states -->
		<Toggle :show="fetchServerState === State.Loading">
			<md-linear-progress indeterminate class="mb-3 w-full" />
		</Toggle>
		<Toggle :show="fetchServerState === State.Error">
			<div class="mb-3 text-center">Error: Failed to fetch server info</div>
		</Toggle>
	</Toggle>
</template>
