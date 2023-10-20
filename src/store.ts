import AccountSettings from "./pages/AccountSettings/_AccountSettings.vue";
import ContinueReading from "./pages/ContinueReading/_ContinueReading.vue";
import Home from "./pages/Home/_Home.vue";
import Library from "./pages/Library/_Library.vue";
import RecentlyAdded from "./pages/RecentlyAdded/_RecentlyAdded.vue";
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

enum Routes {
	Home = "/",
	RecentlyAdded = "/recently-added",
	ContinueReading = "/continue-reading",
	Library = "/library",
	AccountSettings = "/account-settings",
}

/* eslint-disable */
const routes = [
	{ path: Routes.Home, component: Home, },
	{ path: Routes.RecentlyAdded, component: RecentlyAdded, },
	{ path: Routes.ContinueReading, component: ContinueReading, },
	{ path: Routes.Library, component: Library, },
	{ path: Routes.AccountSettings, component: AccountSettings, },
];
/* eslint-enable */

const vibrate = () => navigator.vibrate(100);

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const isNavDrawerLarge = ref(true);

export { routes, router, vibrate, isNavDrawerLarge, Routes };
