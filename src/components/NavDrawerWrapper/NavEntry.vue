<script setup lang="ts">
import router from "../../utils/router";
import { vibrate, isNavDrawerLarge } from "../../utils/store";
import { computed } from "vue";
import "@material/web/ripple/ripple.js";

const props = defineProps({
	name: { type: String, required: true },
	icon: { type: String, required: true },
	target: { type: String, required: true },
	count: { type: String, default: "" },
	mouseover: { type: Function, required: true },
});

const inactive = {
	container: "",
	icon: "text-[color:var(--md-sys-color-on-surface-variant)]",
	label: "text-[color:var(--md-sys-color-on-surface-variant)] font-normal",
};

const active = {
	// container: "bg-[var(--md-sys-color-primary-container)]",
	container: "",
	icon: "text-[color:var(--md-sys-color-on-primary-container)] fa-solid font-bold",
	label: "text-[color:var(--md-sys-color-on-primary-container)] font-medium",
};

const style = computed(() => {
	return router.currentRoute.value.path === props.target ? active : inactive;
});

if (window.innerWidth <= 1024) {
	isNavDrawerLarge.value = true;
}

/** */
</script>

<template>
	<div class="relative z-0">
		<router-link :to="props.target" class="peer" @click="vibrate" @mouseover="props.mouseover">
			<div
				class="relative grid h-14 items-center gap-3 self-center pl-4 pr-6 transition-all"
				:class="
					style.container +
					(isNavDrawerLarge
						? ' grid-cols-[1.5rem_1fr_1.5rem] rounded-[1.75rem]'
						: ' grid-cols-[1.5rem_0fr_0fr] rounded-2xl')
				"
			>
				<md-ripple style="--md-ripple-hover-color: transparent" />
				<div class="flex h-6 w-6 items-center justify-center">
					<i class="fa-light text-xl" :class="props.icon + ' ' + style.icon"></i>
				</div>
				<div class="min-w-0 overflow-hidden whitespace-nowrap text-sm" :class="style.label">
					{{ props.name }}
				</div>
				<div class="min-w-0 overflow-hidden" :class="style.label">
					{{ props.count }}
				</div>
			</div>
		</router-link>

		<!-- Bubble when hover on small nav -->
		<div
			class="pointer-events-none absolute left-[68px] top-0 flex h-full scale-90 items-center justify-center opacity-0 transition-all peer-hover:scale-100 peer-hover:opacity-100"
			:class="isNavDrawerLarge ? 'hidden' : ''"
		>
			<div
				class="whitespace-nowrap rounded-xl bg-[var(--md-sys-color-primary-container)] px-4 py-3"
			>
				{{ props.name }}
			</div>
		</div>
	</div>
</template>
