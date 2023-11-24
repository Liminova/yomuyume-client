import { FastAverageColor } from "fast-average-color";

self.onmessage = async (event: MessageEvent<string>) => {
	const imageURL = event.data;
	const bitmap = await createImageBitmap(await fetch(imageURL).then((res) => res.blob()));
	const color = new FastAverageColor().getColor(bitmap);
	let [r, g, b] = color.value;

	[r, g, b] = [r, g, b].map((x) => Math.round(x / 3));
	self.postMessage({
		solid: `rgba(${r},${g},${b},0.8)`,
		gradient: `linear-gradient(rgba(${r},${g},${b},0.2), rgba(${r},${g},${b},0.8))`,
	});
};
