import router from "../variables/router";
import Routes from "../variables/routes";

/**
 * Navigates to the filter page.
 */
export default function navigateToFilter() {
	router.push(Routes.Filter).catch(() => {
		/** */
	});
}
