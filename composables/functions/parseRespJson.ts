/**
 * Parses a response into a JSON object.
 * @param response The response to parse.
 * @param storeWithSnackbar A vue's reactive ref with "snackbarMessage" as a property.
 * @returns The parsed JSON object, or an empty object if there was an error.
 */
export default async function parseRespJson(
	response: Response,
	setErrMsg: (_: string) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return await response.json();
	} catch (_) {
		setErrMsg("There was an error parsing the response.");
	}

	return {};
}
