<script setup lang="ts">
import { router } from "./router";
import { ref } from "vue";

const isBrowserSafari = ref(/^((?!chrome|android).)*safari/iu.test(navigator.userAgent));

const cookies: Record<string, string> = (() => {
	const cookies: Record<string, string> = {};

	for (const cookie of document.cookie.split(";")) {
		const [key, value] = cookie.split("=");

		cookies[key.trim()] = value;
	}

	return cookies;
})();

if (localStorage.getItem("instance-address") === null || !cookies.session) {
	// TODO: remove this if false on production
	if (false) {
		router.push("/auth").catch(() => {
			/** */
		});
	}
}

/** */
</script>

<template>
	<div>
		<div :class="isBrowserSafari ? 'hidden overflow-hidden' : ''">
			<router-view />
		</div>

		<div
			class="dark fixed inset-0 flex items-center justify-center"
			:class="isBrowserSafari ? '' : 'hidden'"
		>
			<div
				class="elevation-5 flex flex-col items-center justify-center rounded-lg bg-[--md-sys-color-primary-container] px-9 pb-5 pt-7"
			>
				<h2 class="text-2xl font-semibold">
					This webapp works best with non-Safari browsers and non-iPhone users
				</h2>
				<p class="mt-3 text-xl">You sure you want to continue?</p>
				<div class="mt-4 flex flex-row justify-center">
					<button @click="isBrowserSafari = false">Yes</button>

					<a class="px-6 py-[10px]" href="https://google.com/chrome" target="_blank">
						<button
							class="relative rounded-full bg-[--md-sys-color-primary] px-6 py-[10px]"
						>
							<md-ripple />
							<span class="font-medium text-[--md-sys-color-on-primary]">No</span>
						</button>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
