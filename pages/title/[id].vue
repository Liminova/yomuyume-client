<script setup lang="ts">
import "@material/web/button/text-button.js";
import type { TitleServerResponse } from "~/composables/api";
import { indexApi, userApi, fileApiUrl } from "~/composables/api";
import NavDrawerWrapper from "~/layouts/NavDrawerWrapper.vue";

const route = useRoute();
const idRaw = route.params.id;
const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
const snackbarMessage = ref("");
const snackbarTimeout = ref(5000);

const title = ref({}) as Ref<TitleServerResponse>;

const isFavorite = ref(false);
const isBookmark = ref(false);
const favorites = ref(0);
const bookmarks = ref(0);

// Fetching all infos
void (async () => {
	const { data, status } = await indexApi.title(id);

	if (status === "error" || !data) {
		await navigateTo("/404");
		return;
	}

	title.value = data;
	document.title = data.title;
	isFavorite.value = data.is_favorite ?? false;
	isBookmark.value = data.is_bookmark ?? false;
	favorites.value = data.favorites ?? 0;
	bookmarks.value = data.bookmarks ?? 0;
})();

async function toggleFavorite() {
	const { message, status } = await userApi.favorite(id, isFavorite.value ? "DELETE" : "PUT");

	if (status === "error") {
		snackbarMessage.value = message;
		return;
	}

	favorites.value = favorites.value + (isFavorite.value ? -1 : 1);
	isFavorite.value = !isFavorite.value;
	snackbarMessage.value = isFavorite.value ? "Added to favorites" : "Removed from favorites";
}

async function toggleBookmark() {
	const { message, status } = await userApi.bookmark(id, isBookmark.value ? "DELETE" : "PUT");

	if (status === "error") {
		snackbarMessage.value = message;
		return;
	}

	bookmarks.value = bookmarks.value + (isBookmark.value ? -1 : 1);
	isBookmark.value = !isBookmark.value;
	snackbarMessage.value = isBookmark.value ? "Added to bookmarks" : "Removed from bookmarks";
}
</script>

<template>
	<div>
		<Snackbar
			:message="snackbarMessage"
			:timeout="snackbarTimeout"
			@close="snackbarMessage = ''"
		/>
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
							format: page.format,
						}"
					/>
				</div>
			</div>
		</NavDrawerWrapper>
	</div>
</template>
