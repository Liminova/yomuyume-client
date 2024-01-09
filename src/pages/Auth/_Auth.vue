<script setup lang="ts">
import InstanceAddress from "./InstanceAddress.vue";
import LoginMode from "./LoginMode.vue";
import PasswordlessMode from "./PasswordlessMode.vue";
import RegisterMode from "./RegisterMode.vue";
import ResetPassword from "./ResetPassword.vue";
import { AuthState, authState, snackbarMessage } from "./authState";
import SnackBar from "../../components/SnackBar.vue";
import Toggle from "../../components/ToggleWrapper.vue";
import Theme from "../../utils/enums/Theme";
import changeTheme from "../../utils/functions/changeTheme";

changeTheme(Theme.AUTO);
</script>

<template>
	<SnackBar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<div class="flex h-screen items-center justify-center">
		<div class="flex w-80 flex-col">
			<InstanceAddress />

			<Toggle :show="authState == AuthState.Passwordless">
				<PasswordlessMode />
			</Toggle>

			<Toggle :show="authState == AuthState.Login">
				<LoginMode />
			</Toggle>

			<Toggle :show="authState == AuthState.Register">
				<RegisterMode />
			</Toggle>

			<Toggle :show="authState == AuthState.ResetPassword">
				<ResetPassword />
			</Toggle>
		</div>
	</div>
</template>
