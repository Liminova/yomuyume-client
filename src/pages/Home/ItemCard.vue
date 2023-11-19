<script setup lang="ts">
const props = defineProps({
	title: { type: String, required: true },
	artist: { type: String, required: true },
	coverImageUrl: { type: String, required: true },
	contentHeightOfCard: { type: Number, required: true },
});

/** */
</script>

<template>
	<div
		class="relative grid h-full w-full overflow-hidden rounded-xl transition-all"
		:style="`grid-template-rows: 1fr ${contentHeightOfCard}px`"
	>
		<div class="img-cover group relative">
			<img
				draggable="false"
				:src="props.coverImageUrl"
				class="left-0 top-0 h-full w-full rounded-xl object-cover transition-all"
			/>
			<div
				class="absolute left-0 top-0 h-full w-full bg-[rgba(255_255_255/0.08)] opacity-0 transition-all group-[.img-cover]:hover:opacity-100"
			></div>
		</div>

		<!-- NOTE: any changes affect the max possible height of this section, the contentHeightOfCard in _Home.vue must be updated accordingly -->
		<div class="min-h-0 overflow-hidden">
			<div class="m-2">
				<div class="truncate text-sm font-light text-[--md-sys-color-primary-fixed-dim]">
					{{ props.artist }}
				</div>
				<div class="truncate-2 text-base font-bold text-[--md-sys-color-primary-fixed]">
					{{ props.title }}
				</div>
			</div>
		</div>
	</div>
</template>
