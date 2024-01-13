type BreakpointRecord = Record<
	number,
	{
		slidesPerView: number;
		spaceBetween?: number;
	}
>;
type MyImage = {
	src: string;
	width?: number;
	height?: number;
	blurhash?: string;
};
export type { BreakpointRecord, MyImage };
