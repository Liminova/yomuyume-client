<script setup lang="ts">
import { vibrate } from "../../utils/variables/store";
import { ref } from "vue";
import "@material/web/ripple/ripple.js";

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const localStorageTheme = localStorage.getItem("theme") ?? systemTheme;
const theme = ref(localStorageTheme);

const activeButtonStyle =
	"text-[color:var(--md-sys-color-on-primary-container)] bg-[--md-sys-color-primary-container]";

enum Mode {
	Dark = "dark",
	Light = "light",
	Auto = "auto",
}

// TODO: auto mode doesn't quite work yet
function setMode(mode: Mode) {
	vibrate();
	theme.value = mode;
	window.document.documentElement.setAttribute("data-theme", mode);
	window.document.documentElement.setAttribute("class", mode);
	if (mode === Mode.Auto) {
		localStorage.removeItem("theme");
	} else {
		localStorage.setItem("theme", mode);
	}
}

switch (localStorageTheme) {
	case "dark": {
		setMode(Mode.Dark);
		break;
	}

	case "light": {
		setMode(Mode.Light);
		break;
	}

	default: {
		setMode(Mode.Auto);
		break;
	}
}
</script>

<template>
	<div class="mx-3 grid h-10 grid-cols-3 overflow-hidden">
		<div class="relative rounded-s-full">
			<md-ripple />
			<button
				class="h-full w-full rounded-s-full border-y-[1px] border-l-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'dark' ? activeButtonStyle : ''"
				@click="setMode(Mode.Dark)"
			>
				<i class="fa-moon" :class="theme === 'dark' ? 'fa-solid' : 'fa-light'" />
			</button>
		</div>
		<div class="relative">
			<!-- <md-ripple /> -->
			<button
				class="h-full w-full border-y-[1px] border-l-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] opacity-80 transition-all"
				:class="theme === 'auto' ? activeButtonStyle : ''"
				disabled
				@click="setMode(Mode.Auto)"
			>
				<i class="fa-moon-over-sun" :class="theme === 'auto' ? 'fa-solid' : 'fa-light'" />
			</button>
		</div>
		<div class="relative rounded-e-full">
			<md-ripple />
			<button
				class="h-full w-full rounded-e-full border-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'light' ? activeButtonStyle : ''"
				@click="setMode(Mode.Light)"
			>
				<i class="fa-sun" :class="theme === 'light' ? 'fa-solid' : 'fa-light'" />
			</button>
		</div>
	</div>
</template>
