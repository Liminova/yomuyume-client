import _404 from "../../pages/404Page.vue";
import Auth from "../../pages/Auth/_Auth.vue";
import Category from "../../pages/Category/_Category.vue";
import Filter from "../../pages/Filter/_Filter.vue";
import Home from "../../pages/Home/_Home.vue";
import Library from "../../pages/Library/_Library.vue";
import Settings from "../../pages/Settings/_Settings.vue";
import Item from "../../pages/Title/_Title.vue";
import Routes from "../variables/routes";
import { createRouter, createWebHistory } from "vue-router";

/* eslint-disable */
const routes = [
	{ path: Routes._404, component: _404 },
	{ path: Routes.Auth, component: Auth },
	{ path: Routes.Category, component: Category },
	{ path: Routes.Filter, component: Filter },
	{ path: Routes.Home, component: Home },
	{ path: Routes.Library, component: Library },
	{ path: Routes.Settings, component: Settings },
	{ path: Routes.Title, component: Item },
	{ path: "/:pathMatch(.*)*", redirect: Routes._404 },
];
/* eslint-enable */

export default createRouter({
	history: createWebHistory(),
	routes,
});
