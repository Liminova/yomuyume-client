import AccountSettings from "./pages/AccountSettings/_AccountSettings.vue";
import ContinueReading from "./pages/ContinueReading/_ContinueReading.vue";
import Home from "./pages/Home/_Home.vue";
import Library from "./pages/Library/_Library.vue";
import RecentlyAdded from "./pages/RecentlyAdded/_RecentlyAdded.vue";
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

function vibrate(): boolean {
	navigator.vibrate(8);
	return true;
}

const isNavDrawerLarge = ref(true);

export { routes, router, vibrate, isNavDrawerLarge, Routes };
