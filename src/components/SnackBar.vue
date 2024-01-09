<script setup lang="ts">
import debounce from "debounce";
import { ref, watchEffect } from "vue";

const props = defineProps({
	message: {
		type: String,
		required: true,
	},
	action: {
		type: Function,
		default: () => undefined,
	},
	actionText: {
		type: String,
		default: "",
	},
	showClose: {
		type: Boolean,
		default: false,
	},
	timeout: {
		type: Number,
		default: 5000,
	},
	autoHide: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(["close"]);

const state = ref(false);
const container = ref<HTMLElement | null>(null);

function close() {
	if (container.value) {
		container.value.style.transform = "translate(0, 200%)";
	}

	debounce(() => {
		state.value = false;
		emits("close");
	}, 200)();
}

function show() {
	// Don't show if message is empty
	if (!props.message) {
		return;
	}

	// Show the snackbar
	state.value = true;
	debounce(() => {
		if (container.value) {
			container.value.style.transform = "translate(0)";
		}
	}, 100)();

	// Close the snackbar if autoHide or close button is not shown
	if (props.autoHide || !props.showClose) {
		debounce(() => {
			close();
		}, props.timeout)();
	}
}

watchEffect(() => {
	show();
});
</script>

<template>
	<div
		v-if="state"
		ref="container"
		class="fixed bottom-6 flex w-full items-center justify-center transition-transform"
		:style="{ transform: 'translate(0, 200%)' }"
	>
		<div
			class="flex max-w-xl flex-row items-center gap-1 rounded bg-zinc-800 px-4 shadow"
			:style="{ paddingRight: props.actionText !== '' || props.showClose ? '0' : '1rem' }"
		>
			<div class="w-full grow py-[14px] text-sm leading-5 tracking-wide text-gray-100">
				{{ props.message }}
			</div>

			<button
				v-if="props.actionText !== ''"
				class="ml-1 p-[10px] text-center text-sm font-medium leading-5 tracking-normal text-purple-300"
				@click="props.action"
			>
				{{ props.actionText }}
			</button>

			<button v-if="props.showClose" class="m-1 p-2" @click="close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
						fill="#F5EFF7"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>
