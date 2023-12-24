<script setup lang="ts">
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/progress/linear-progress.js";
import "@material/web/button/filled-tonal-button.js";
import { authState, AuthState } from "./authState";
import instanceAddr from "../../api/base";
import otherApi from "../../api/other";
import userApi from "../../api/user";
import Toggle from "../../components/ToggleWrapper.vue";
import Routes from "../../utils/variables/routes";
import { State } from "../../utils/variables/store";
import { inject, ref } from "vue";
import type { Router } from "vue-router";

const serverVersion = ref("");
const fetchServerState = ref(State.Idle);
const hideServerAddrChange = ref(false);

async function fetchInstanceInfo(_instanceAddr = instanceAddr.value) {
	authState.value = AuthState.Idle;

	if (_instanceAddr === "") {
		fetchServerState.value = State.Idle;
		return Promise.resolve();
	}

	fetchServerState.value = State.Loading;

	const result = await otherApi.status();

	if (!result.res.ok) {
		fetchServerState.value = State.Error;
		return Promise.reject(new Error(""));
	}

	if (result.body.password_less !== undefined && result.body.password_less) {
		authState.value = AuthState.Passwordless;
	} else {
		authState.value = AuthState.Login;
	}

	fetchServerState.value = State.Loaded;
	serverVersion.value = result.body.version;
	hideServerAddrChange.value = true;
	return Promise.resolve();
}

function instanceAddrChanged(_instanceAddr: string) {
	instanceAddr.value = _instanceAddr;
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

const router = inject("router", {}) as Router;

userApi
	.check()
	.then((res) => {
		if (res) {
			void router.push(Routes.Home);
		}
	})
	.catch(() => {
		/** */
	});
</script>

<template>
	<Toggle class="mx-auto mb-3" :show="fetchServerState === State.Loaded">
		<div>{{ serverVersion }}</div>
	</Toggle>

	<Toggle :show="!hideServerAddrChange">
		<!-- Input + Check instance addr -->
		<md-outlined-text-field
			v-model="instanceAddr"
			label="Instance address"
			class="mb-3 w-full"
			@keydown.enter="instanceAddrChanged(instanceAddr)"
		/>
		<Toggle :show="fetchServerState !== State.Loaded">
			<md-filled-tonal-button
				class="mb-3 w-full"
				:disabled="fetchServerState === State.Loaded"
				@click="instanceAddrChanged(instanceAddr)"
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
