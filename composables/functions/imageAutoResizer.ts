import { swiperBreakpoints } from "../globalStore";
import debounce from "debounce";
import type { BreakpointRecord } from "../types";

/**
 * Gets the number of slides per view and the space between slides from the
 * swiper breakpoints configuration based on the current window width.
 *
 * @param breakpoints Swiper breakpoints configuration, default is
 * swiperBreakpoints from src/variables/store.ts
 */
function getSwiperBreakpoint(breakpoints: BreakpointRecord): [number, number] {
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

	// if the window width is smaller than the smallest breakpoint, return the
	// smallest breakpoint
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
 * @param containerRef The ref of the container of the images
 * @param setImagePerRow The setter of the number of images per row, useful when
 * you need how many images are in a row to set grid-template-columns, default
 * is undefined a.k.a. disabled
 * @param _gapPixel - The gap in pixels between images, default is -1 (use value
 * from swiperBreakpoints).
 * @param imageXratio - The aspect ratio of the image's width (default is 3).
 * @param imageYratio - The aspect ratio of the image's height (default is 4).
 * @param breakpoints Swiper breakpoints configuration, default is
 * swiperBreakpoints from src/variables/store.ts
 * @returns The calculated height of the image.
 */
function calcImageHeight(
	containerRef: Ref<HTMLElement | null>,
	setImagePerRow: (_: number) => void,
	_gapPixel = -1,
	imageXratio = 3,
	imageYratio = 4,
	breakpoints: BreakpointRecord = swiperBreakpoints
): number {
	if (!containerRef.value) {
		return 0;
	}

	const containerWidth = containerRef.value.clientWidth;

	if (containerWidth === 0) {
		return 0;
	}

	const [numberOfImagesPerRow, spaceBetween] = getSwiperBreakpoint(breakpoints);
	const gapPixel = _gapPixel === -1 ? spaceBetween : _gapPixel;

	setImagePerRow(numberOfImagesPerRow);

	const totalGapPixel = (numberOfImagesPerRow - 1) * gapPixel;
	const xAxisOfCard = (containerWidth - totalGapPixel) / numberOfImagesPerRow;
	const yAxisOfCard = (xAxisOfCard * imageYratio) / imageXratio;

	return Math.round(yAxisOfCard);
}

/**
 * Resize the height of the images' container to match the desired ratio,
 * automatically on imagesContainerRef's resize.
 *
 * @param containerRef The ref of the container of the images
 * @param setImageHeight The setter of the image's height
 * @param setImagePerRow The setter of the number of images per row, useful when you need how many images are in a row to set grid-template-columns, default is undefined a.k.a. disabled
 * @param gapPixel The gap in pixels between images, default is -1 (use value from swiperBreakpoints)
 * @param xRatio The horizontal ratio, default is 3
 * @param yRatio The vertical ratio, default is 4
 * @param breakpoints Swiper breakpoints configuration, default is swiperBreakpoints from src/variables/store.ts
 */
export default function imageAutoResizer(
	containerRef: Ref<HTMLElement | null>,
	setImageHeight: (_: number) => void,
	setImagePerRow: (_: number) => void,
	gapPixel = -1,
	xRatio = 3,
	yRatio = 4,
	breakpoints: BreakpointRecord = swiperBreakpoints
) {
	if (!containerRef.value) {
		return;
	}

	const resizeObserver = new ResizeObserver(
		debounce(() => {
			setImageHeight(
				calcImageHeight(containerRef, setImagePerRow, gapPixel, xRatio, yRatio, breakpoints)
			);
		}, 100)
	);

	resizeObserver.observe(containerRef.value);
}
