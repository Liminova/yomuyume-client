import Auth from "../../pages/Auth/_Auth.vue";
import Filter from "../../pages/Filter/_Filter.vue";
import FourOhFour from "../../pages/FourOhFour.vue";
import Home from "../../pages/Home/_Home.vue";
import Item from "../../pages/Item/_Item.vue";
import Library from "../../pages/Library/_Library.vue";
import Routes from "../variables/routes";
import Settings from "../../pages/Settings/_Settings.vue";
import { createRouter, createWebHistory } from "vue-router";

/* eslint-disable */
const routes = [
	{ path: Routes.Auth, component: Auth },
	{ path: Routes.Filter, component: Filter },
	{ path: Routes.FourOhFour, component: FourOhFour },
	{ path: Routes.Home, component: Home },
	{ path: Routes.Item, component: Item },
	{ path: Routes.Library, component: Library },
	{ path: Routes.Settings, component: Settings },
	{ path: "/:pathMatch(.*)*", redirect: Routes.FourOhFour },
];
/* eslint-enable */

export default createRouter({
	history: createWebHistory(),
	routes,
});
