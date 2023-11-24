function isFormatSupported(format: string, dataUri: string): Promise<boolean> {
	return new Promise((resolve, _) => {
		const image = new Image();

		image.src = `data:image/${format};base64,${dataUri}`;

		image.onload = () => {
			resolve(true);
		};

		image.onerror = () => {
			resolve(false);
		};
	});
}

/**
 * Checks if the browser supports the JPEG XL format.
 */
async function isJxlSupported(): Promise<boolean> {
	if (window.sessionStorage.getItem("isJxlSupported")) {
		return Promise.resolve(window.sessionStorage.getItem("isJxlSupported") === "true");
	}

	const isJxlSupported = await isFormatSupported(
		"jxl",
		"/woIAAAMABKIAgC4AF3lEgAAFSqjjBu8nOv58kOHxbSN6wxttW1hSaLIODZJJ3BIEkkaoCUzGM6qJAE="
	);

	window.sessionStorage.setItem("isJxlSupported", isJxlSupported.toString());
	return isJxlSupported;
}

/**
 * Checks if the browser supports the AVIF format.
 */
async function isAvifSupported(): Promise<boolean> {
	if (window.sessionStorage.getItem("isAvifSupported")) {
		return Promise.resolve(window.sessionStorage.getItem("isAvifSupported") === "true");
	}

	const isAvifSupported = await isFormatSupported(
		"avif",
		"AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
	);

	window.sessionStorage.setItem("isAvifSupported", isAvifSupported.toString());
	return isAvifSupported;
}

export { isJxlSupported, isAvifSupported };
