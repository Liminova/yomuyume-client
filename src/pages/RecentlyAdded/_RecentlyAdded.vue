<script setup lang="ts">
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import { isNavDrawerLarge } from "../../store";
import { onMounted } from "vue";

onMounted(() => {
	if (window.innerWidth < 1280) {
		isNavDrawerLarge.value = false;
	}
});
</script>

<template>
	<NavDrawerWrapper> Recently added </NavDrawerWrapper>
</template>
