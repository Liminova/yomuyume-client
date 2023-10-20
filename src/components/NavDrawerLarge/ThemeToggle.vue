<script setup lang="ts">
import { ref } from "vue";
import "@material/web/ripple/ripple.js";

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const localStorageTheme = localStorage.getItem("theme") ?? systemTheme;
const theme = ref(localStorageTheme);

switch (localStorageTheme) {
	case "dark": {
		setDarkMode();
		break;
	}

	case "light": {
		setLightMode();
		break;
	}

	default: {
		setAutoMode();
		break;
	}
}

const activeButtonStyle =
	"text-[color:var(--md-sys-color-on-primary-container)] bg-[--md-sys-color-primary-container]";

function setDarkMode() {
	theme.value = "dark";
	window.document.documentElement.setAttribute("data-theme", "dark");
	localStorage.setItem("theme", "dark");
}

function setLightMode() {
	theme.value = "light";
	window.document.documentElement.setAttribute("data-theme", "light");
	localStorage.setItem("theme", "light");
}

function setAutoMode() {
	theme.value = "auto";
	window.document.documentElement.setAttribute("data-theme", systemTheme);
	localStorage.removeItem("theme");
}
</script>

<template>
	<div class="mx-3 grid h-10 grid-cols-3 overflow-hidden">
		<div class="relative rounded-s-full">
			<md-ripple></md-ripple>
			<button
				class="h-full w-full rounded-s-full border-y-[1px] border-l-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'dark' ? activeButtonStyle : ''"
				@click="setDarkMode"
			>
				<i class="fa-moon" :class="theme === 'dark' ? 'fa-solid' : 'fa-light'"></i>
			</button>
		</div>
		<div class="relative">
			<md-ripple></md-ripple>
			<button
				class="h-full w-full border-y-[1px] border-l-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'auto' ? activeButtonStyle : ''"
				@click="setAutoMode"
			>
				<i class="fa-bolt-auto" :class="theme === 'auto' ? 'fa-solid' : 'fa-light'"></i>
			</button>
		</div>
		<div class="relative rounded-e-full">
			<md-ripple></md-ripple>
			<button
				class="h-full w-full rounded-e-full border-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'light' ? activeButtonStyle : ''"
				@click="setLightMode"
			>
				<i class="fa-sun" :class="theme === 'light' ? 'fa-solid' : 'fa-light'"></i>
			</button>
		</div>
	</div>
</template>
