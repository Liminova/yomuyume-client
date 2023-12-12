<script setup lang="ts">
import FilterChipWrapper from "./FilterChipWrapper.vue";
import { FilterReadingStatus, FilterSortResult, FilterItemStatus } from "./enums";
import { getRouteQueries, getRouteQuery } from "./getRouteQueries";
import ItemCard from "../../components/ItemCard.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import imageAutoResizer from "../../utils/functions/imageAutoResizer";
import { items, randomCategories } from "../../utils/variables/random";
import { inject, onMounted, ref, watchEffect } from "vue";
import type { Item } from "../../utils/variables/random";
import type { LocationQueryValue, Router } from "vue-router";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/radio/radio.js";

const router = inject("router", {}) as Router;

// Results =====================================================================

const filteredItems = ref<Array<Item>>(items);

// For the result grid =========================================================

const imageContainerRef = ref<HTMLElement | null>(null);
const imageHeight = ref(200);
const numberOfImagePerRow = ref(5);
const gapPixel = ref(16);

// Chips variables =============================================================

const readingStatus = ref(
	getRouteQueries(router, "readingStatus", Object.values(FilterReadingStatus))
);
const sortBy = ref(getRouteQuery(router, "sortResult", Object.values(FilterSortResult)));

const itemStatus = ref(getRouteQueries(router, "itemStatus", Object.values(FilterItemStatus)));

const inCategories = ref(new Set<string>());

// Logics ======================================================================

onMounted(() => {
	imageAutoResizer(imageContainerRef, imageHeight, numberOfImagePerRow, gapPixel.value, 3, 4);
});

// TODO: implement server-side handling, this is only for the demo
watchEffect(() => {
	const filtered = items.filter((item) => {
		let isCompleted = true;

		if (
			itemStatus.value.has(FilterItemStatus.Completed) &&
			!itemStatus.value.has(FilterItemStatus.Ongoing)
		) {
			isCompleted = item.tags.includes("completed");
		}

		const inCategoriesMatch = inCategories.value.has(item.categoryUUID);

		return isCompleted && inCategoriesMatch;
	});

	if (sortBy.value === FilterSortResult.NewestAdded) {
		filtered.sort((a, b) => b.dateAdded - a.dateAdded);
	} else if (sortBy.value === FilterSortResult.NewestUpdated) {
		filtered.sort((a, b) => b.dateUpdated - a.dateUpdated);
	}

	filteredItems.value = filtered.length !== 0 ? filtered : items;
});

/** either "NewestAdded" or "NewestUpdated" is allowed at once */
function chipSortResultHandler(eventTarget: HTMLElement) {
	const label = eventTarget.shadowRoot?.querySelector(".label")?.textContent ?? "";
	const selected = eventTarget.getAttribute("selected") === null;

	if (selected) {
		sortBy.value = label;
	}
}

function chipCategoryHandler(eventTarget: HTMLElement) {
	const uuid = eventTarget.getAttribute("uuid") ?? "";
	const selected = eventTarget.getAttribute("selected") === null;

	if (selected) {
		inCategories.value.add(uuid);
	} else {
		inCategories.value.delete(uuid);
	}
}

/** Chips get added to their corresponding array */
function chipHandler(eventTarget: HTMLElement, chipArr: Set<LocationQueryValue> | Set<string>) {
	const label = eventTarget.shadowRoot?.querySelector(".label")?.textContent ?? "";
	const selected = eventTarget.getAttribute("selected") === null;

	if (selected) {
		chipArr.add(label);
	} else {
		chipArr.delete(label);
	}
}
</script>

<template>
	<NavDrawerWrapper class="mt-3 flex w-full flex-col px-6 lg:mt-0 lg:pl-0 lg:pr-3">
		<!-- Filter region -->
		<div class="flex w-full flex-col gap-2">
			<div class="text-4xl font-bold">I want to finds ones that...</div>
			<md-filled-text-field label="filter by keywords" value="" class="my-4 max-w-sm" />

			<FilterChipWrapper title="I'm">
				<md-filter-chip
					v-for="status in Object.values(FilterReadingStatus)"
					:key="status"
					:label="status"
					:selected="readingStatus.has(status)"
					@click="chipHandler($event.target, readingStatus)"
				/>
			</FilterChipWrapper>

			<FilterChipWrapper title="sort by">
				<md-filter-chip
					:label="FilterSortResult.NewestAdded"
					:selected="sortBy === FilterSortResult.NewestAdded"
					@click="chipSortResultHandler($event.target)"
				/>
				<md-filter-chip
					:label="FilterSortResult.NewestUpdated"
					:selected="sortBy === FilterSortResult.NewestUpdated"
					@click="chipSortResultHandler($event.target)"
				/>
			</FilterChipWrapper>

			<FilterChipWrapper title="that are">
				<md-filter-chip
					v-for="status in Object.values(FilterItemStatus)"
					:key="status"
					:label="status"
					:selected="itemStatus.has(status)"
					@click="chipHandler($event.target, itemStatus)"
				/>
			</FilterChipWrapper>

			<FilterChipWrapper title="in category">
				<md-filter-chip
					v-for="category in randomCategories"
					:key="category.categoryUUID"
					:uuid="category.categoryUUID"
					:label="category.title"
					@click="chipCategoryHandler($event.target)"
				/>
			</FilterChipWrapper>
		</div>

		<!-- Result region -->
		<div class="my-4 text-4xl font-bold">Here's what I found</div>
		<div
			ref="imageContainerRef"
			class="grid transition-all"
			:style="{
				gridTemplateColumns: `repeat(${numberOfImagePerRow}, 1fr)`,
				gap: `${gapPixel}px`,
			}"
		>
			<ItemCard
				v-for="item in filteredItems"
				:key="item.itemUUID"
				:author="item.author"
				:cover="item.cover"
				:title="item.title"
				:item-uuid="item.itemUUID"
				:item="item"
				:cover-height="imageHeight"
				:progress="item.pageRead"
			/>
		</div>
	</NavDrawerWrapper>
</template>