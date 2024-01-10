<script setup lang="ts">
import indexApi from "../../api";
import fileApiUrl from "../../api/file";
import ImagePoly from "../../components/ImagePoly/_ImagePoly.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import SnackBar from "../../components/SnackBar.vue";
import Routes from "../../utils/variables/routes";
import { inject, ref } from "vue";
import type { TitleResponseBody } from "../../api";
import type { Ref } from "vue";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;
const idRaw = router.currentRoute.value.params.titleId;
const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
const snackbarMessage = ref("");

const title = ref({}) as Ref<TitleResponseBody>;

void (async () => {
	const res = await indexApi.title(id, snackbarMessage);

	if (!res[0].ok) {
		void router.push(Routes._404);
		return;
	}

	title.value = res[1];
	document.title = title.value.title;
})();
</script>

<template>
	<SnackBar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<NavDrawerWrapper>
		<div class="mt-3 px-0 lg:mt-0 lg:pl-0 lg:pr-3">
			<!-- Basic infos -->
			<div class="mb-7 px-7 lg:px-0">
				<div class="text-6xl font-semibold">{{ title.title }}</div>
				<div v-if="title.desc">{{ title.desc }}</div>
			</div>

			<!-- Pages -->
			<div v-for="page in title.pages" :key="page.id" class="mx-auto max-w-[700px]">
				<ImagePoly
					:image="{
						src: fileApiUrl.page(page.id),
					}"
				/>
			</div>
		</div>
	</NavDrawerWrapper>
</template>
