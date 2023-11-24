/**
 * Converts [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) to [Blob URL](https://developer.mozilla.org/en-US/docs/Web/API/Blob) for shorter data transfer between the main thread and workers.
 *
 * @param data Data URL
 * @returns Blob URL
 */
export default async function dataToBlobURL(data: string): Promise<string> {
	const result = await fetch(data);
	const blob = await result.blob();
	const blobUrl = URL.createObjectURL(blob);

	return Promise.resolve(blobUrl);
}
