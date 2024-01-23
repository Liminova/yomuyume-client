<script setup lang="ts">
import Snackbar from "~/components/Snackbar.vue";
import InstanceAddress from "~/components/auth/InstanceAddress.vue";
import LoginMode from "~/components/auth/LoginMode.vue";
import PasswordlessMode from "~/components/auth/PasswordlessMode.vue";
import RegisterMode from "~/components/auth/RegisterMode.vue";
import ResetPassword from "~/components/auth/ResetPassword.vue";
import { AuthScreen, authStore } from "~/components/auth/authStore";
import Theme from "~/composables/enums/Theme";
import changeTheme from "~/composables/functions/changeTheme";

changeTheme(Theme.AUTO);

document.title = "Yomuyume - Auth";
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<Snackbar :message="authStore.snackbarMessage" />
		<div class="flex w-80 flex-col">
			<InstanceAddress />

			<Toggle :show="authStore.screen == AuthScreen.Passwordless">
				<PasswordlessMode />
			</Toggle>

			<Toggle :show="authStore.screen == AuthScreen.Login">
				<LoginMode />
			</Toggle>

			<Toggle :show="authStore.screen == AuthScreen.Register">
				<RegisterMode />
			</Toggle>

			<Toggle :show="authStore.screen == AuthScreen.ResetPassword">
				<ResetPassword />
			</Toggle>
		</div>
	</div>
</template>
