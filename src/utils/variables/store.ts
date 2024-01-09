import { ref } from "vue";
import type BreakpointRecord from "../types/BreakpointsRecord";

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

const isNavDrawerLarge = ref(false);
const isTopBarVisible = ref(true);

const swiperBreakpoints: BreakpointRecord = {
	0: {
		slidesPerView: 2,
	},
	768: {
		slidesPerView: 3,
	},
	1024: {
		slidesPerView: 4,
	},
	1280: {
		slidesPerView: 5,
	},
	1536: {
		slidesPerView: 6,
	},
	1792: {
		slidesPerView: 7,
	},
};

export { isNavDrawerLarge, isTopBarVisible, State, swiperBreakpoints, vibrate };
