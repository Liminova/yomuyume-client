import { ref } from "vue";

enum State {
	Idle = "Idle",
	Loading = "Loading",
	Loaded = "Loaded",
	Error = "Error",
}

function vibrate(): undefined {
	const isBrowserSafari = /^((?!chrome|android).)*safari/iu.test(navigator.userAgent);

	if (!isBrowserSafari) {
		navigator.vibrate(10);
	}

	return undefined;
}

const isNavDrawerLarge = ref(true);
const isTopBarVisible = ref(true);

export { vibrate, isNavDrawerLarge, isTopBarVisible, State };
