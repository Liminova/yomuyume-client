import calcImgHeight4Carousl from "./calcImgHeight4Carousl";
import { swiperBreakpoints } from "../variables/store";
import debounce from "debounce";
import { Ref } from "vue";
import type BreakPointRecord from "../types/BreakPointsRecord";

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
	breakpoints: BreakPointRecord = swiperBreakpoints
) {
	if (imagesContainerRef.value === null) {
		return;
	}

	function resizeImageHeight() {
		imageHeightRef.value = calcImgHeight4Carousl(
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
