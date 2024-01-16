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
	format: string;
};
type GenericServerResponse = {
	description?: string;
	message?: string;
};
export type { BreakpointRecord, MyImage, GenericServerResponse };
