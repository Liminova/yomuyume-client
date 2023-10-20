<script setup lang="ts">
import LogoAndTitle from "./LogoAndTitle.vue";
import NavToggleIcon from "./NavToggleIcon.vue";
</script>

<template>
	<div class="sticky top-0 flex h-[--topbar-height] flex-row items-center gap-2 pr-4">
		<div class="flex flex-row items-center justify-start">
			<NavToggleIcon class="mx-4 w-12" />
			<LogoAndTitle />
		</div>
	</div>
</template>
