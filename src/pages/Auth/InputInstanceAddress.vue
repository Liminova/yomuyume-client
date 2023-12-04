<script setup lang="ts">
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/progress/linear-progress.js";
import AuthType from "./AuthType";
import {
	fetchInstanceInfoState,
	email,
	isEmailValidState,
	loginCode,
	sendCodeState,
	authType,
} from "./states";
import Toggle from "../../components/ToggleWrapper.vue";
import { State } from "../../utils/variables/store";
import debounce from "debounce";
import { ref, watchEffect } from "vue";

const instanceAddr = ref(localStorage.getItem("instance-address")!);

async function fetchInstanceInfo(_instanceAddr = instanceAddr.value) {
	// TODO: implement fetch server info api
	email.value = "";
	isEmailValidState.value = false;
	loginCode.value = "";
	sendCodeState.value = State.Idle;

	if (_instanceAddr === "") {
		fetchInstanceInfoState.value = State.Idle;
		return Promise.resolve();
	}

	fetchInstanceInfoState.value = State.Loading;

	setTimeout(() => {
		// TODO: remove this on production
		if (instanceAddr.value.includes("FORCE_ERROR")) {
			fetchInstanceInfoState.value = State.Error;
			return;
		}

		fetchInstanceInfoState.value = State.Loaded;
		authType.value = AuthType.UserEmailPassword;
	}, 1000);
	return Promise.resolve();
}

function instanceAddrChanged(_instanceAddr: string) {
	localStorage.setItem("instance-address", _instanceAddr);
	fetchInstanceInfo(_instanceAddr).catch(() => {
		fetchInstanceInfoState.value = State.Error;
	});
}

watchEffect(() => {
	debounce(instanceAddrChanged, 1000)(instanceAddr.value);
});

(async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const instanceParam = urlParams.get("instance");

	if (instanceParam !== null) {
		localStorage.setItem("instance-address", instanceParam);
	}

	await fetchInstanceInfo();
})().catch(() => {
	fetchInstanceInfoState.value = State.Error;
});
</script>

<template>
	<!-- Input instance addr -->
	<md-outlined-text-field v-model="instanceAddr" label="Instance address" class="mb-3" />

	<!-- Progress -->
	<Toggle :show="fetchInstanceInfoState === State.Loading">
		<md-linear-progress indeterminate class="mb-3 w-full" />
	</Toggle>
	<Toggle :show="fetchInstanceInfoState === State.Error">
		<div class="mb-3 text-center">Error: Failed to fetch server info</div>
	</Toggle>
</template>
