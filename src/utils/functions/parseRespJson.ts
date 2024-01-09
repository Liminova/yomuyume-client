import type { Ref } from "vue";

/**
 * Parses a response into a JSON object.
 * @param response The response to parse.
 * @param errRef A reference to a string to set if there is an error.
 * @returns The parsed JSON object, or an empty object if there was an error.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function parseRespJson(response: Response, errRef: Ref<string>): Promise<any> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return await response.json();
	} catch (_) {
		errRef.value = "There was an error parsing the response.";
	}

	return {};
}
