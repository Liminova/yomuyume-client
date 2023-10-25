<script setup lang="ts">
import { onMounted } from "vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper.vue";
import { isNavDrawerLarge } from "../../store";

onMounted(() => {
	if (window.innerWidth < 1280) {
		isNavDrawerLarge.value = false;
	}
});
</script>

<template>
	<NavDrawerWrapper> Account Settings </NavDrawerWrapper>
</template>
