<script setup lang="ts">
import { router, vibrate } from "../../store";
import { computed } from "vue";

const props = defineProps({
	icon: { type: String, required: true },
	target: { type: String, required: true },
});
const inactive = {
	container: "",
	icon: "text-[color:var(--md-sys-color-on-surface-variant)]",
	label: "text-[color:var(--md-sys-color-on-surface-variant)] font-normal",
};

const active = {
	container: "bg-[var(--md-sys-color-primary-container)] scale-[1.01]",
	icon: "text-[color:var(--md-sys-color-on-primary-container)] fa-solid",
	label: "text-[color:var(--md-sys-color-on-primary-container)] font-medium",
};

const style = computed(() => {
	return router.currentRoute.value.path === props.target ? active : inactive;
});

//
</script>

<template>
	<router-link :to="props.target" :on-click="vibrate">
		<div
			class="relative flex h-14 w-14 flex-col items-center justify-center gap-2 rounded-2xl transition-all"
			:class="style.container"
		>
			<md-ripple></md-ripple>
			<div class="flex flex-col items-center">
				<i
					class="fa-light text-xl transition-all"
					:class="props.icon + ' ' + style.icon"
				></i>
			</div>
		</div>
	</router-link>
</template>
