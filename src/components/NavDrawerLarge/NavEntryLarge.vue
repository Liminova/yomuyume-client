<script setup lang="ts">
import router from "../../router";
import { vibrate } from "../../store";
import { computed } from "vue";
import "@material/web/ripple/ripple.js";

const props = defineProps({
	name: { type: String, required: true },
	icon: { type: String, required: true },
	target: { type: String, required: true },
	count: { type: String, default: "" },
});

const inactive = {
	container: "",
	icon: "text-[color:var(--md-sys-color-on-surface-variant)]",
	label: "text-[color:var(--md-sys-color-on-surface-variant)] font-normal",
};

const active = {
	container: "bg-[var(--md-sys-color-primary-container)] scale-[1.01]",
	icon: "text-[color:var(--md-sys-color-on-primary-container)] fa-solid font-bold",
	label: "text-[color:var(--md-sys-color-on-primary-container)] font-medium",
};

const style = computed(() => {
	return router.currentRoute.value.path === props.target ? active : inactive;
});

/** */
</script>

<template>
	<router-link :to="props.target" @click="vibrate">
		<div
			class="relative mx-3 flex h-14 flex-row items-center justify-between rounded-full p-4 transition-all"
			:class="style.container"
		>
			<md-ripple />
			<div class="flex flex-row items-center justify-start gap-3">
				<i
					class="fa-light text-xl transition-all"
					:class="props.icon + ' ' + style.icon"
				></i>
				<div class="whitespace-nowrap text-sm transition-all" :class="style.label">
					{{ props.name }}
				</div>
			</div>
			<div class="mx-2" :class="style.label">
				{{ props.count }}
			</div>
		</div>
	</router-link>
</template>
