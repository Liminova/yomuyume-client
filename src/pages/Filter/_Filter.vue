<script setup lang="ts">
import "@material/web/textfield/filled-text-field.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/radio/radio.js";
import ChipSection from "./ChipSection.vue";
import { FilterReadingStatus, FilterSortBy, FilterSortOrder, FilterType } from "./FilterType";
import indexApi from "../../api";
import fileApiUrl from "../../api/file";
import ItemCard from "../../components/ItemCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import SnackBar from "../../components/SnackBar.vue";
import Toggle from "../../components/ToggleWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import debounce from "debounce";
import { onMounted, ref, watchEffect } from "vue";
import type { FilterTitleResponseBody } from "../../api";

// Key: category id, Value: category name
const categories = ref<Record<string, string>>({});
const snackbarMessage = ref("");

void (async () => {
	const response = await indexApi.categories(snackbarMessage);

	for (const category of response) {
		categories.value[category.id] = category.name;
	}
})();

// For the result grid styling =================================================

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const numberOfImagePerRow = ref(5);
const gapPixel = ref(16);

// Results =====================================================================

const filteredTitles = ref<Array<FilterTitleResponseBody>>([]); /** found titles */
const filteredTitlesToDisplay = ref<Array<FilterTitleResponseBody>>([]);

function renderMoreResult() {
	const howFarFromBottom = document.body.getBoundingClientRect().bottom - window.innerHeight;

	if (howFarFromBottom < 200) {
		const newTitles = filteredTitles.value.slice(
			filteredTitlesToDisplay.value.length,
			filteredTitlesToDisplay.value.length + numberOfImagePerRow.value * 3
		);

		filteredTitlesToDisplay.value = filteredTitlesToDisplay.value.concat(newTitles);
	}
}

onMounted(() => {
	imageAutoResizer(imageContainerRef, imageHeight, numberOfImagePerRow, gapPixel.value, 3, 4);
	window.addEventListener("scroll", debounce(renderMoreResult, 50));
});

// Chips variables =============================================================

const keywords = ref<string>("");
const inCategories = ref(new Set<string>());
const readingStatus = ref<Array<string>>([]);
const sortBy = ref("");
const sortOrder = ref("");

function chipCategoryHandler(eventTarget: HTMLElement) {
	const uuid = eventTarget.getAttribute("uuid") ?? "";
	const selected = eventTarget.getAttribute("selected") === null;

	if (selected) {
		inCategories.value.add(uuid);
	} else {
		inCategories.value.delete(uuid);
	}
}

watchEffect(async () => {
	filteredTitles.value = await indexApi.filter(
		{
			keywords: keywords.value
				.split(" ")
				.map((keyword) => keyword.trim())
				.filter((keyword) => keyword !== ""),
			category_ids: Array.from(inCategories.value),
			is_reading: readingStatus.value.includes(FilterReadingStatus.Reading.name),
			is_finished: readingStatus.value.includes(FilterReadingStatus.Finished.name),
			is_bookmarked: readingStatus.value.includes(FilterReadingStatus.Bookmarked.name),
			is_favorite: readingStatus.value.includes(FilterReadingStatus.Liked.name),
			sort_by: sortBy.value,
			sort_order: sortOrder.value,
		},
		snackbarMessage
	);

	filteredTitlesToDisplay.value = filteredTitles.value.slice(0, numberOfImagePerRow.value * 3);
});
</script>

<template>
	<SnackBar :message="snackbarMessage" @close="snackbarMessage = ''" />
	<NavDrawerWrapper class="mb-10 mt-3 flex w-full flex-col px-6 lg:mt-0 lg:pl-0 lg:pr-3">
		<!-- Filter region -->
		<div class="flex w-full flex-col gap-2">
			<div class="text-4xl font-bold">I want to finds ones that...</div>
			<md-filled-text-field
				v-model="keywords"
				label="filter by keywords"
				value=""
				class="my-4 max-w-sm"
			/>

			<ChipSection
				title="I'm"
				:filter-type="FilterType.ReadingStatus"
				:filter-type-posible-val="FilterReadingStatus"
				@add="readingStatus.push($event)"
				@delete="readingStatus.splice(readingStatus.indexOf($event), 1)"
			/>

			<ChipSection
				title="sort by"
				:filter-type="FilterType.SortResult"
				:filter-type-posible-val="FilterSortBy"
				is-overwrite
				@overwrite="sortBy = $event"
			/>

			<ChipSection
				title="in order"
				:filter-type="FilterType.SortOrder"
				:filter-type-posible-val="FilterSortOrder"
				is-overwrite
				@overwrite="sortOrder = $event"
			/>

			<div class="flex flex-row flex-wrap items-center gap-4">
				<div class="text-xl font-semibold">in category</div>
				<md-chip-set class="flex-rows flex">
					<md-filter-chip
						v-for="category_id in Object.keys(categories)"
						:key="category_id"
						:uuid="category_id"
						:label="categories[category_id]"
						@click="chipCategoryHandler($event.target)"
					/>
				</md-chip-set>
			</div>
		</div>

		<!-- Result region -->
		<Toggle :show="filteredTitles.length > 0">
			<div class="mb-8 mt-10 text-4xl font-bold">Here's what I found</div>
		</Toggle>
		<Toggle :show="filteredTitles.length === 0">
			<div class="mb-8 mt-10 text-4xl font-bold">Can't find anything</div>
		</Toggle>
		<div
			ref="imageContainerRef"
			class="grid"
			:style="{
				gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
				gap: `${gapPixel}px`,
			}"
		>
			<router-link
				v-for="title in filteredTitlesToDisplay"
				:key="title.id"
				:to="`/title/${title.id}`"
			>
				<ItemCard
					:author="title.author ?? 'Unknown'"
					:cover="{
						src: fileApiUrl.thumbnail(title.id),
						width: title.width,
						height: title.height,
						blurhash: title.blurhash,
					}"
					:cover-height="imageHeight"
					:progress="title.page_read ? title.page_read / title.page_count : 0"
					:title="title.title"
					:title-id="title.id"
				/>
			</router-link>
		</div>
	</NavDrawerWrapper>
</template>
