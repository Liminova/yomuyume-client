<script setup lang="ts">
import { getRouteQueries } from "./getRouteQueries";
import { inject, ref } from "vue";
import type { FilterTypePosibleVal, FilterType } from "./FilterType";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	filterTypePosibleVal: {
		type: Object as () => FilterTypePosibleVal,
		required: true,
	},
	filterType: {
		type: String as () => FilterType,
		required: true,
	},
	isOverwrite: {
		type: Boolean,
		default: false,
	},
	currentStateForOverwrite: {
		type: String,
		default: "",
	},
});

const foundValsInQueries = getRouteQueries(
	router,
	props.filterType,
	Object.values(props.filterTypePosibleVal).map((status) => status.name)
);

const emit = defineEmits(["add", "delete", "overwrite"]);

const chipSet = ref<HTMLElement | null>(null);

function chipHandler(eventTarget: HTMLElement) {
	const label = eventTarget.shadowRoot?.querySelector(".label")?.textContent ?? "";
	const selected = eventTarget.getAttribute("selected") === null;

	if (!selected) {
		emit("delete", label);
		return;
	}

	if (props.isOverwrite) {
		emit("overwrite", `overwrite ${label}`);
		if (!chipSet.value) {
			return;
		}

		const chips = chipSet.value.querySelectorAll("md-filter-chip");

		for (const chip of chips) {
			if (chip === eventTarget) {
				continue;
			}

			chip.removeAttribute("selected");
		}

		return;
	}

	emit("add", label);
}
</script>

<template>
	<div class="flex flex-row flex-wrap items-center gap-4">
		<div class="text-xl font-semibold">{{ props.title }}</div>
		<md-chip-set ref="chipSet" class="flex flex-row items-stretch">
			<md-filter-chip
				v-for="{ name, icon } in props.filterTypePosibleVal"
				:key="name"
				:label="name"
				:selected="props.currentStateForOverwrite === name || foundValsInQueries.has(name)"
				@click="chipHandler($event.target)"
			>
				<span slot="icon" class="flex items-center justify-center">
					<i :class="`fa-light fa-${icon} text-sm`" />
				</span>
			</md-filter-chip>
		</md-chip-set>
	</div>
</template>
./FilterType
