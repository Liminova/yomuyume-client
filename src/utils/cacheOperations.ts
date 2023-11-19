async function saveToCache(path: string, data: string, maxAge: number) {
	const cacheDir = await caches.open("polyfill");

	await cacheDir.put(
		path,
		new Response(data, {
			headers: { "cache-control": `max-age=${maxAge}` },
		})
	);
}

async function getFromCache(path: string): Promise<string> {
	const cacheDir = await caches.open("polyfill");
	const cached = await cacheDir.match(path, {
		ignoreVary: true, // ignore differences in Headers
		ignoreMethod: true, // ignore differences in HTTP methods
	});

	if (cached) {
		return cached.text();
	}

	return Promise.resolve("");
}

export { saveToCache, getFromCache };
