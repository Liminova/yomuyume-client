import AccountSettings from "./pages/AccountSettings/_AccountSettings.vue";
import Auth from "./pages/Auth/_Auth.vue";
import ContinueReading from "./pages/ContinueReading/_ContinueReading.vue";
import Home from "./pages/Home/_Home.vue";
import Library from "./pages/Library/_Library.vue";
import RecentlyAdded from "./pages/RecentlyAdded/_RecentlyAdded.vue";
import { createRouter, createWebHistory } from "vue-router";

enum Routes {
	Home = "/",
	RecentlyAdded = "/recently-added",
	ContinueReading = "/continue-reading",
	Library = "/library",
	AccountSettings = "/account-settings",
	Auth = "/auth",
}

/* eslint-disable */
const routes = [
	{ path: Routes.Home, component: Home },
	{ path: Routes.RecentlyAdded, component: RecentlyAdded },
	{ path: Routes.ContinueReading, component: ContinueReading },
	{ path: Routes.Library, component: Library },
	{ path: Routes.AccountSettings, component: AccountSettings },
	{ path: Routes.Auth, component: Auth }
];
/* eslint-enable */

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export { router, Routes };
