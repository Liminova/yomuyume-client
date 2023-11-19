<script setup lang="ts">
import NavEntry from "./NavEntry.vue";
import ThemeToggle from "./ThemeToggle.vue";
import router from "../../utils/router";
import Routes from "../../utils/routes";
import { isNavDrawerLarge as isNavOpen, vibrate } from "../../utils/store";
import DividerBar from "../DividerBar.vue";
import Toggle from "../ToggleWrapper.vue";
import { ref } from "vue";

const entryBackground = ref<HTMLElement | null>(null);

function resetEntryBg() {
	if (entryBackground.value === null) {
		return;
	}

	const entryIndex = entryIndexMap.indexOf(router.currentRoute.value.path);

	if (entryIndex === -1) {
		entryBackground.value.style.opacity = "0";
		setTimeout(() => {
			if (entryBackground.value === null) {
				return;
			}

			entryBackground.value.style.display = "none";
		}, 150);
	}

	entryBackground.value.style.transform = `translateY(${56 * entryIndex}px)`;
}

// NOTE: keep this array in sync with the entries in NavDrawer.vue
const entryIndexMap: Array<string> = [
	Routes.Home,
	Routes.Library,
	Routes.ContinueReading,
	Routes.RecentlyAdded,
	Routes.CompletedStories,
	Routes.CompletedReads,
];

function moveEntryBg(index: number) {
	return () => {
		if (entryBackground.value === null) {
			return;
		}

		if (index !== -1) {
			entryBackground.value.style.display = "flex";
			entryBackground.value.style.opacity = "1";
		}

		entryBackground.value.style.transform = `translateY(${56 * index}px)`;
	};
}
</script>

<!-- NOTE: DO NOT USE this component in any place other than NavDrawerWrapper.vue -->
<template>
	<div
		class="fixed left-0 top-[--topbar-height] z-10 flex h-[calc(100vh-var(--topbar-height))] w-full flex-row transition-all lg:max-w-[360px] lg:translate-x-0"
		:class="
			isNavOpen ? 'translate-x-0 lg:max-w-[360px]' : '-translate-x-[360px] lg:max-w-[80px]'
		"
	>
		<div
			class="relative flex h-full w-full max-w-[360px] flex-col justify-start rounded-br-[3rem] bg-[--md-sys-color-surface] shadow-2xl transition-all lg:w-full lg:rounded-none lg:shadow-none"
		>
			<!-- Entries' background -->
			<div
				ref="entryBackground"
				class="absolute left-0 top-0 flex h-14 w-full select-none items-stretch px-3 transition-all"
				:class="
					entryIndexMap.indexOf(router.currentRoute.value.path) === -1 ? 'opacity-0' : ''
				"
				:style="{
					transform:
						'translateY(' +
						56 * entryIndexMap.indexOf(router.currentRoute.value.path) +
						'px)',
					display:
						entryIndexMap.indexOf(router.currentRoute.value.path) === -1
							? 'none'
							: 'flex',
				}"
			>
				<div
					class="flex-rows w-full bg-[var(--md-sys-color-primary-container)] transition-all"
					:class="isNavOpen ? 'rounded-[1.75rem]' : 'rounded-2xl'"
				></div>
			</div>

			<div class="mx-3" @mouseleave="resetEntryBg()">
				<NavEntry
					name="Home"
					icon="fa-house"
					:target="Routes.Home"
					count=""
					:mouseover="moveEntryBg(0)"
				/>
				<NavEntry
					name="Library"
					icon="fa-book"
					:target="Routes.Library"
					count=""
					:mouseover="moveEntryBg(1)"
				/>
				<NavEntry
					name="Continue reading"
					icon="fa-rectangle-history"
					:target="Routes.ContinueReading"
					count="10"
					:mouseover="moveEntryBg(2)"
				/>
				<NavEntry
					name="Recently added"
					icon="fa-stars"
					:target="Routes.RecentlyAdded"
					:mouseover="moveEntryBg(3)"
				/>
				<NavEntry
					name="Completed stories"
					icon="fa-check"
					:target="Routes.CompletedStories"
					:mouseover="moveEntryBg(4)"
				/>
				<NavEntry
					name="Completed reading"
					icon="fa-check-to-slot"
					:target="Routes.CompletedReads"
					:mouseover="moveEntryBg(5)"
				/>
			</div>
			<Toggle :show="isNavOpen">
				<DividerBar />
				<ThemeToggle />
			</Toggle>
		</div>

		<!-- A blank space on the right side of the nav drawer on mobile to close the nav drawer when clicked -->
		<div
			class="h-[calc(100vh-var(--top-bar-height))] w-full shrink-[100]"
			:class="isNavOpen ? 'block' : 'hidden'"
			@click="vibrate() && (isNavOpen = false)"
		></div>
	</div>
</template>
