import Routes from "./routes";
import AccountSettings from "../pages/AccountSettings/_AccountSettings.vue";
import Auth from "../pages/Auth/_Auth.vue";
import CompletedReads from "../pages/CompletedReads/_CompletedReads.vue";
import CompletedStories from "../pages/CompletedStories/_CompletedStories.vue";
import ContinueReading from "../pages/ContinueReading/_ContinueReading.vue";
import Home from "../pages/Home/_Home.vue";
import Library from "../pages/Library/_Library.vue";
import NewlyUpdated from "../pages/NewlyUpdated/_NewlyUpdated.vue";
import RecentlyAdded from "../pages/RecentlyAdded/_RecentlyAdded.vue";
import Search from "../pages/Search/_Search.vue";
import { createRouter, createWebHistory } from "vue-router";

/* eslint-disable */
const routes = [
	{ path: Routes.AccountSettings, component: AccountSettings },
	{ path: Routes.Auth, component: Auth },
	{ path: Routes.CompletedReads, component: CompletedReads },
	{ path: Routes.CompletedStories, component: CompletedStories },
	{ path: Routes.ContinueReading, component: ContinueReading },
	{ path: Routes.Home, component: Home },
	{ path: Routes.Library, component: Library },
	{ path: Routes.NewlyUpdated, component: NewlyUpdated },
	{ path: Routes.RecentlyAdded, component: RecentlyAdded },
	{ path: Routes.Search, component: Search },
];
/* eslint-enable */

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;