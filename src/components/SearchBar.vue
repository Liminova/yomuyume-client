<script setup lang="ts">
const props = defineProps({
	placeholder: { type: String, default: "Search" },
});

//
</script>

<template>
	<div
		class="flex h-14 max-w-xs flex-row items-center justify-between rounded-full bg-[--md-sys-color-surface-container-high] pl-4 pr-3"
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
		<!-- <img src="https://picsum.photos/200" class="w-10 h-10 rounded-full overflow-hidden" /> -->
	</div>
</template>
