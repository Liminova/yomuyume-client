<script setup lang="ts">
import NavDrawerWrapper from "../../components/NavDrawerWrapper.vue";
import { isNavDrawerLarge } from "../../store";
import { onMounted } from "vue";

onMounted(() => {
	if (window.innerWidth < 1280) {
		isNavDrawerLarge.value = false;
	}
});
</script>

<template>
	<NavDrawerWrapper> Continue reading </NavDrawerWrapper>
</template>
