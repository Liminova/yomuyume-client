import { swiperBreakpoints } from "../variables/store";
import debounce from "debounce";
import type BreakpointRecord from "../types/BreakpointsRecord";
import type { Ref } from "vue";

/**
 * Gets the number of slides per view and the space between slides from the
 * swiper breakpoints configuration based on the current window width.
 *
 * @param breakpoints Swiper breakpoints configuration, default is swiperBreakpoints from src/variables/store.ts
 */
function getSwiperBreakpoint(breakpoints: BreakpointRecord = swiperBreakpoints): [number, number] {
	const sortedBreakpoints = Object.keys(breakpoints).sort((a, b) => Number(b) - Number(a));

	// this matches the behavior of swiperjs: from a certain width, look down to
	// the nearest smaller breakpoint and use that as the slidesPerView
	const breakpoint = sortedBreakpoints.find(
		(breakpoint) => Number(breakpoint) <= window.innerWidth
	);

	if (breakpoint) {
		const data = breakpoints[Number(breakpoint)];
		let spaceBetween = 0;

		if (typeof data.spaceBetween === "number" && data.spaceBetween > 0) {
			spaceBetween = data.spaceBetween;
		}

		return [data.slidesPerView, spaceBetween];
	}

	// if the window width is smaller than the smallest breakpoint, return the smallest breakpoint
	const data = breakpoints[Number(sortedBreakpoints[sortedBreakpoints.length - 1])];
	let spaceBetween = 0;

	if (typeof data.spaceBetween === "number" && data.spaceBetween > 0) {
		spaceBetween = data.spaceBetween;
	}

	return [data.slidesPerView, spaceBetween];
}

/**
 * Calculates the height of an image in a swiper carousel.
 *
 * @param containerRef - A reference to the container element to get the width from.
 * @param imagePerRowRef The ref of the number of images per row, useful when you need how many images are in a row to set grid-template-columns, default is ref(undefined) a.k.a. disabled
 * @param _gapPixel - The gap in pixels between images, default is -1 (use value from swiperBreakpoints).
 * @param imageXratio - The aspect ratio of the image's width (default is 3).
 * @param imageYratio - The aspect ratio of the image's height (default is 4).
 * @param breakpoints Swiper breakpoints configuration, default is swiperBreakpoints from src/variables/store.ts
 * @returns The calculated height of the image.
 */
function calcImageHeight(
	containerRef: Ref<HTMLElement | null>,
	imagePerRowRef: Ref<number> | undefined = undefined,
	_gapPixel = -1,
	imageXratio = 3,
	imageYratio = 4,
	breakpoints: BreakpointRecord = swiperBreakpoints
): number {
	if (!containerRef.value) {
		return 300;
	}

	const [numberOfImagesPerRow, spaceBetween] = getSwiperBreakpoint(breakpoints);
	const gapPixel = _gapPixel === -1 ? spaceBetween : _gapPixel;

	if (imagePerRowRef !== undefined) {
		imagePerRowRef.value = numberOfImagesPerRow;
	}

	const totalGapPixel = (numberOfImagesPerRow - 1) * gapPixel;
	const xAxisOfCard = (containerRef.value.offsetWidth - totalGapPixel) / numberOfImagesPerRow;
	const yAxisOfCard = (xAxisOfCard * imageYratio) / imageXratio;

	return Math.round(yAxisOfCard);
}

/**
 * Resize the height of the images' container to match the desired ratio,
 * automatically on imagesContainerRef's resize.
 *
 * @param imagesContainerRef The ref of the images' container
 * @param imageHeightRef The ref of the image's height
 * @param imagePerRowRef The ref of the number of images per row, useful when you need how many images are in a row to set grid-template-columns, default is ref(undefined) a.k.a. disabled
 * @param gapPixel The gap in pixels between images, default is -1 (use value from swiperBreakpoints)
 * @param xRatio The horizontal ratio, default is 3
 * @param yRatio The vertical ratio, default is 4
 * @param breakpoints Swiper breakpoints configuration, default is swiperBreakpoints from src/variables/store.ts
 */
export default function imageAutoResizer(
	imagesContainerRef: Ref<HTMLElement | null>,
	imageHeightRef: Ref<number>,
	imagePerRowRef: Ref<number> | undefined = undefined,
	gapPixel = -1,
	xRatio = 3,
	yRatio = 4,
	breakpoints: BreakpointRecord = swiperBreakpoints
) {
	if (imagesContainerRef.value === null) {
		return;
	}

	function resizeImageHeight() {
		imageHeightRef.value = calcImageHeight(
			imagesContainerRef,
			imagePerRowRef,
			gapPixel,
			xRatio,
			yRatio,
			breakpoints
		);
	}

	const resizeObserver = new ResizeObserver(debounce(resizeImageHeight, 100));

	resizeObserver.observe(imagesContainerRef.value);
}
