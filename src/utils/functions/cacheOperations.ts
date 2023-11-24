import { MAX_AGE } from "../variables/store";

/**
 * Saves data to cache, use it like localStorage.setItem
 */
async function saveToCache(key: string, value: string) {
	const cacheDir = await caches.open("polyfill");

	await cacheDir.put(
		key,
		new Response(value, {
			headers: { "cache-control": `max-age=${MAX_AGE}` },
		})
	);
}

/**
 * use it like localStorage.getItem
 */
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
