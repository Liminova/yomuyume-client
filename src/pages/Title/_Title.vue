<script setup lang="ts">
import "@material/web/button/text-button.js";
import indexApi from "../../api";
import fileApiUrl from "../../api/file";
import userApi, { Action } from "../../api/user";
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
const snackbarTimeout = ref(5000);

const title = ref({}) as Ref<TitleResponseBody>;

const isFavorite = ref(false);
const isBookmark = ref(false);
const favorites = ref(0);
const bookmarks = ref(0);

// Fetching all infos
void (async () => {
	const res = await indexApi.title(id, snackbarMessage);

	if (!res[0].ok) {
		void router.push(Routes._404);
		return;
	}

	title.value = res[1];
	document.title = title.value.title;
	isFavorite.value = title.value.is_favorite ?? false;
	isBookmark.value = title.value.is_bookmark ?? false;
	favorites.value = title.value.favorites ?? 0;
	bookmarks.value = title.value.bookmarks ?? 0;
})();

function toggleFavorite() {
	void userApi
		.favorite(id, isFavorite.value ? Action.DELETE : Action.PUT, snackbarMessage)
		.then((ok) => {
			if (!ok) {
				return;
			}

			favorites.value = favorites.value + (isFavorite.value ? -1 : 1);
			isFavorite.value = !isFavorite.value;
			snackbarMessage.value = isFavorite.value
				? "Added to favorites"
				: "Removed from favorites";
		});
}

function toggleBookmark() {
	void userApi
		.bookmark(id, isBookmark.value ? Action.DELETE : Action.PUT, snackbarMessage)
		.then((ok) => {
			if (!ok) {
				return;
			}

			bookmarks.value = bookmarks.value + (isBookmark.value ? -1 : 1);
			isBookmark.value = !isBookmark.value;
			snackbarMessage.value = isBookmark.value
				? "Added to bookmarks"
				: "Removed from bookmarks";
		});
}
</script>

<template>
	<SnackBar :message="snackbarMessage" :timeout="snackbarTimeout" @close="snackbarMessage = ''" />
	<NavDrawerWrapper>
		<div class="mt-3 px-0 lg:mt-0 lg:pl-0 lg:pr-3">
			<!-- Basic infos -->
			<div class="mb-7 px-7 lg:px-0">
				<div class="text-6xl font-semibold">{{ title.title }}</div>
				<div v-if="title.desc" class="mt-7 text-justify">{{ title.desc }}</div>
			</div>

			<!-- Like and fav buttons -->
			<div class="my-7 flex w-full grow-[100] flex-row items-center justify-center gap-7">
				<md-text-button class="scale-125" @click="toggleBookmark">
					<i
						class="fa-bookmark"
						:class="{
							'fa-solid': isBookmark,
							'fa-light': !isBookmark,
						}"
					/>
					{{ bookmarks > 0 ? bookmarks : "" }}
				</md-text-button>
				<md-text-button class="scale-125" @click="toggleFavorite">
					<i
						class="fa-heart"
						:class="{
							'fa-solid': isFavorite,
							'fa-light': !isFavorite,
						}"
					/>
					{{ favorites > 0 ? favorites : "" }}
				</md-text-button>
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
