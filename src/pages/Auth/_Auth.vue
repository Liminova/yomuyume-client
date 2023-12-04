<script setup lang="ts">
import AuthType from "./AuthType";
import InputCodeAndLoginButton from "./InputCodeAndLoginButton.vue";
import InputEmailAndSendCodeButton from "./InputEmailAndSendCodeButton.vue";
import InputInstanceAddress from "./InputInstanceAddress.vue";
import UserEmailPassword from "./UserEmailPassword.vue";
import { authType, fetchInstanceInfoState } from "./states";
import Toggle from "../../components/ToggleWrapper.vue";
import Theme from "../../utils/enums/Theme";
import changeTheme from "../../utils/functions/changeTheme";
import { State } from "../../utils/variables/store";

changeTheme(Theme.AUTO);
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<div class="flex w-80 flex-col transition-all">
			<InputInstanceAddress />

			<Toggle
				:show="fetchInstanceInfoState === State.Loaded && authType === AuthType.EmailCode"
			>
				<InputEmailAndSendCodeButton />
				<InputCodeAndLoginButton />
			</Toggle>

			<Toggle
				:show="
					fetchInstanceInfoState === State.Loaded &&
					authType === AuthType.UserEmailPassword
				"
			>
				<UserEmailPassword />
			</Toggle>
		</div>
	</div>
</template>
