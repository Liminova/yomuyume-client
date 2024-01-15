import type { BreakpointRecord } from "./types";

function vibrate(): undefined {
	const isBrowserSafari = /^((?!chrome|android).)*safari/iu.test(navigator.userAgent);

	if (!isBrowserSafari) {
		navigator.vibrate(10);
	}

	return undefined;
}

const globalStore = reactive({
	isNavDrawerLarge: true,
	isTopBarVisible: true,
	token: (() => {
		const cookie: Array<[string, string]> = document.cookie
			.split("; ")
			.map((x) => x.split("=") as [string, string]);
		const token = cookie.find(([key]) => key === "token")?.[1];

		return token ?? "";
	})(),
	instanceAddr: localStorage.getItem("instance-address") ?? "http://localhost:3000",
});

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

export { globalStore, swiperBreakpoints, vibrate };
