<script setup lang="ts">
const props = defineProps({
	placeholder: { type: String, default: "Search" },
});

/** */
</script>

<template>
	<div>
		<div
			class="hidden h-12 max-w-xs flex-row items-center justify-between rounded-full bg-[--md-sys-color-surface-container-high] pl-4 pr-3 md:flex"
		>
			<div class="flex items-center justify-center gap-4">
				<i
					class="fa-regular fa-magnifying-glass text-xl text-[color:var(--md-sys-color-on-surface-variant)]"
				></i>
				<input
					id=""
					type="text"
					name=""
					:placeholder="props.placeholder"
					class="bg-transparent text-[color:var(--md-sys-color-on-surface-variant)]"
				/>
			</div>
		</div>
		<i
			class="fa-regular fa-magnifying-glass mr-3 block text-2xl text-[color:var(--md-sys-color-on-surface-variant)] md:hidden"
		></i>
	</div>
</template>
