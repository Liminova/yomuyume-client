import type { Router } from "vue-router";

/**
 * Get the queries from the current route
 *
 * @param router the router instance
 * @param query the query to get
 * @param constrains the list of allowed values
 */
function getRouteQueries(router: Router, query: string, constrains?: Array<string>) {
	const resultMixed = router.currentRoute.value.query[query];
	const result = typeof resultMixed === "string" ? [resultMixed] : resultMixed ?? [];

	if (constrains) {
		return new Set(result.filter((value) => constrains.includes(value!)));
	}

	return new Set(result);
}

/**
 * Like getRouteQueries, but only returns the first value
 *
 * @param router the router instance
 * @param query the query to get
 * @param constrains the list of allowed values
 */
function getRouteQuery(router: Router, query: string, constrains?: Array<string>) {
	const resultMixed = router.currentRoute.value.query[query];
	const result = typeof resultMixed === "string" ? resultMixed : resultMixed?.[0];

	if (constrains) {
		return constrains.includes(result!) ? result : undefined;
	}

	return result;
}

export { getRouteQueries, getRouteQuery };
