import type MyImage from "../../utils/interfaces/MyImage";

enum Formats {
	avif = "avif",
	jxl = "jxl",
}

async function isFormatSupported(format: Formats): Promise<boolean> {
	const formats: Record<Formats, { testData: string; sessionStorageKey: string }> = {
		avif: {
			testData:
				"AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",
			sessionStorageKey: "isAvifSupported",
		},
		jxl: {
			testData:
				"/woIAAAMABKIAgC4AF3lEgAAFSqjjBu8nOv58kOHxbSN6wxttW1hSaLIODZJJ3BIEkkaoCUzGM6qJAE=",
			sessionStorageKey: "isJxlSupported",
		},
	};

	if (window.sessionStorage.getItem(formats[format].sessionStorageKey)) {
		return Promise.resolve(window.sessionStorage.getItem("isJxlSupported") === "true");
	}

	const image = new Image();

	image.src = `data:image/${format};base64,${formats[format].testData}`;

	const isFormatSupported: boolean = await new Promise((resolve, _) => {
		image.onload = () => {
			resolve(true);
		};

		image.onerror = () => {
			resolve(false);
		};
	});

	window.sessionStorage.setItem(formats[format].sessionStorageKey, isFormatSupported.toString());
	return isFormatSupported;
}

export default async function doNeedPolyfill(image: MyImage) {
	const doNeedPolyfillAvif =
		image.format === Formats.avif && !(await isFormatSupported(Formats.avif));
	const doNeedPolyfillJxl =
		image.format === Formats.jxl && !(await isFormatSupported(Formats.jxl));

	return doNeedPolyfillAvif || doNeedPolyfillJxl;
}
