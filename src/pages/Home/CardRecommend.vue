<script setup lang="ts">
import { recommendsContainerHeight, snackbarMessage } from "./store";
import "@material/web/chips/assist-chip.js";
import fileApiUrl from "../../api/file";
import indexApi from "../../api/index";
import utilsApi from "../../api/utils";
import ImagePoly from "../../components/ImagePoly/_ImagePoly.vue";
import { ref } from "vue";
import type { FilterTitleResponse, TitleResponseBody } from "../../api/index";
import type { Ref } from "vue";

const props = defineProps({
	previewTitle: {
		type: Object as () => FilterTitleResponse,
		required: true,
	},
	isFirstTitle: { type: Boolean, default: true },
	isLastTitle: { type: Boolean, default: false },
});

const cover = {
	width: props.previewTitle.width,
	height: props.previewTitle.height,
	blurhash: props.previewTitle.blurhash,
	src: fileApiUrl.thumbnail(props.previewTitle.id),
};

const fullTitle: Ref<TitleResponseBody> = ref({}) as Ref<TitleResponseBody>;
const titleTagNames = ref<Array<string>>([]);
const tagIdToNameMap = ref<Array<[number, string]>>([]);

void (async () => {
	tagIdToNameMap.value = (await utilsApi.tags(snackbarMessage)).tags;
	const response = await indexApi.title(props.previewTitle.id, snackbarMessage);

	fullTitle.value = response[1];

	titleTagNames.value = response[1].tag_ids.map((tagId) => {
		const tagName = tagIdToNameMap.value.find((tag) => tag[0] === tagId);

		return tagName ? tagName[1] : "";
	});
})();

/** */
</script>

<template>
	<router-link
		:to="`/title/${props.previewTitle.id}`"
		class="recommend-container relative flex h-full flex-row justify-center overflow-hidden bg-black/50 sm:static"
		:class="{ 'rounded-l-3xl': props.isFirstTitle, 'rounded-r-3xl': props.isLastTitle }"
	>
		<!-- Background -->
		<div
			class="absolute left-0 top-0 z-[-1] hidden w-full overflow-hidden sm:block"
			:class="{ 'rounded-l-3xl': props.isFirstTitle, 'rounded-r-3xl': props.isLastTitle }"
			:style="{ height: `${recommendsContainerHeight}px` }"
		>
			<ImagePoly
				class="w-full scale-110 overflow-hidden object-cover blur-sm"
				:draggable="false"
				:image="cover"
				image-class="overflow-hidden"
				:lazy="false"
			/>
		</div>

		<!-- Cover -->
		<div class="h-full w-full sm:min-w-[350px] sm:max-w-xs lg:py-10 lg:pl-10">
			<ImagePoly
				:draggable="false"
				:image="cover"
				class="h-full overflow-hidden lg:rounded-2xl"
				image-class="h-full object-cover"
			/>
		</div>

		<div
			class="pointer-events-none absolute left-0 top-0 flex h-full w-full bg-black/50 sm:hidden"
		/>

		<!-- Informations -->
		<div
			class="absolute left-0 top-0 z-[1] flex h-full w-full flex-col justify-end p-7 sm:static sm:z-auto sm:max-w-3xl sm:justify-start sm:bg-transparent sm:p-10"
		>
			<div class="text-lg font-light" data-theme="dark">
				{{ props.previewTitle.author ?? "Unknown" }}
			</div>
			<div class="truncate-2 text-balance mb-1 text-3xl font-bold" data-theme="dark">
				{{ props.previewTitle.title }}
			</div>

			<div class="truncate">
				{{ props.previewTitle.release_date }}
			</div>

			<div v-if="titleTagNames.includes(`completed`)" class="mb-2" data-theme="dark">
				<i class="fa-solid fa-circle-check mr-2" />
				<span>Completed</span>
			</div>

			<div
				v-if="titleTagNames.length !== 0"
				class="mb-2 hidden flex-row flex-wrap gap-2 sm:flex"
			>
				<router-link v-for="tag in titleTagNames" :key="tag" :to="`/filter/tags=${tag}`">
					<md-assist-chip :key="tag" :label="tag" class="elevation-3" />
				</router-link>
			</div>

			<div
				v-if="fullTitle.desc"
				class="truncate-5 sm:truncate-8 z-[1] overflow-hidden"
				data-theme="dark"
			>
				{{ fullTitle.desc }}
			</div>
		</div>
	</router-link>
</template>
