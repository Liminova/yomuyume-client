<script setup lang="ts">
import Theme from "../../utils/enums/Theme";
import changeTheme from "../../utils/functions/changeTheme";
import "@material/web/ripple/ripple.js";
import { ref } from "vue";

const theme = ref(Theme.AUTO);

changeTheme(theme.value);

const activeButtonStyle =
	"text-[color:var(--md-sys-color-on-primary-container)] bg-[--md-sys-color-primary-container]";

if (localStorage.getItem("theme") !== null) {
	theme.value = localStorage.getItem("theme") as Theme;
}
</script>

<template>
	<div class="mx-3 grid h-10 grid-cols-3 overflow-hidden">
		<div class="relative rounded-s-full">
			<md-ripple />
			<button
				class="h-full w-full rounded-s-full border-y-[1px] border-l-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'dark' ? activeButtonStyle : ''"
				@click="(theme = Theme.DARK) && changeTheme(Theme.DARK)"
			>
				<i class="fa-moon" :class="theme === 'dark' ? 'fa-solid' : 'fa-light'" />
			</button>
		</div>
		<div class="relative">
			<md-ripple />
			<button
				class="h-full w-full border-y-[1px] border-l-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'auto' ? activeButtonStyle : ''"
				@click="(theme = Theme.AUTO) && changeTheme(Theme.AUTO)"
			>
				<i class="fa-moon-over-sun" :class="theme === 'auto' ? 'fa-solid' : 'fa-light'" />
			</button>
		</div>
		<div class="relative rounded-e-full">
			<md-ripple />
			<button
				class="h-full w-full rounded-e-full border-[1px] border-solid border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] transition-all"
				:class="theme === 'light' ? activeButtonStyle : ''"
				@click="(theme = Theme.LIGHT) && changeTheme(Theme.LIGHT)"
			>
				<i class="fa-sun" :class="theme === 'light' ? 'fa-solid' : 'fa-light'" />
			</button>
		</div>
	</div>
</template>
