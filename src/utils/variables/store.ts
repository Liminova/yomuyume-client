import { ref } from "vue";
import type BreakPointRecord from "../types/BreakPointsRecord";

enum State {
	Idle = "Idle",
	Loading = "Loading",
	Loaded = "Loaded",
	Error = "Error",
}

// TODO: query this from server
const MAX_AGE = 1209600;
const MAX_WORKERS = Math.round(navigator.hardwareConcurrency / 2) || 4;

function vibrate(): undefined {
	const isBrowserSafari = /^((?!chrome|android).)*safari/iu.test(navigator.userAgent);

	if (!isBrowserSafari) {
		navigator.vibrate(10);
	}

	return undefined;
}

const isNavDrawerLarge = ref(true);
const isTopBarVisible = ref(true);

const swiperBreakpoints: BreakPointRecord = {
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

export {
	vibrate,
	isNavDrawerLarge,
	isTopBarVisible,
	MAX_AGE,
	MAX_WORKERS,
	State,
	swiperBreakpoints,
};
