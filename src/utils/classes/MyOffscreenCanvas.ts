import { decodeBlurHash } from "fast-blurhash";

export default class MyOffscreenCanvas extends OffscreenCanvas {
	fromImageData(imageData: ImageData): this {
		const ctx = this.getContext("2d");

		if (!ctx) {
			return this;
		}

		ctx.putImageData(imageData, 0, 0);
		return this;
	}

	fromRawData(data: Uint8ClampedArray): this {
		this.fromImageData(new ImageData(data, this.width, this.height));
		return this;
	}

	fromBlob(blob: Blob): Promise<this> {
		return new Promise((resolve, _) => {
			const image = new Image();

			image.src = URL.createObjectURL(blob);

			image.onload = () => {
				const ctx = this.getContext("2d");

				if (!ctx) {
					return;
				}

				ctx.drawImage(image, 0, 0);
				resolve(this);
			};
		});
	}

	fromBlurhash(blurhash: string): this {
		this.fromRawData(decodeBlurHash(blurhash, this.width, this.height));
		return this;
	}

	async convertToBlobURL(): Promise<string> {
		const ctx = this.getContext("2d");

		if (!ctx) {
			return Promise.reject(new Error("Could not get context"));
		}

		return URL.createObjectURL(await ctx.canvas.convertToBlob());
	}

	async convertToBase64(): Promise<string> {
		const reader = new FileReader();
		const ctx = this.getContext("2d");

		if (!ctx) {
			return Promise.reject(new Error("Could not get context"));
		}

		const blob = await ctx.canvas.convertToBlob();

		reader.readAsDataURL(blob);

		return new Promise((resolve, _) => {
			reader.onloadend = () => {
				resolve(reader.result as string);
			};
		});
	}
}
