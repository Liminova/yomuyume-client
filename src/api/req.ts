import instanceAddr from "./base";

/**
 * Send a request to the server.
 *
 * @param path without the instance address
 * @param method "GET" | "POST" | "PUT" | "DELETE" ...
 * @param body JSON serializable object
 * @param headers just in case I need it
 * @returns the response
 */
export default async function req(
	path: string,
	method: string,
	body?: Record<string, unknown> | object | undefined,
	headers?: Record<string, string> | undefined
): Promise<Response> {
	const content = {
		method,
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
		...(body && { body: JSON.stringify(body) }),
	};

	return fetch(new URL(path, instanceAddr.value), content);
}

/**
 * Send a request to the server with the Authorization header.
 *
 * @param path without the instance address
 * @param method "GET" | "POST" | "PUT" | "DELETE" ...
 * @param body JSON serializable object
 * @param headers just in case I need it
 * @returns the response
 */
async function reqWithAuth(
	path: string,
	method: string,
	body?: Record<string, unknown> | object,
	headers?: Record<string, string>
): Promise<Response> {
	return fetch(new URL(path, instanceAddr.value), {
		method,
		headers: {
			...headers,
			Authorization: `Bearer ${localStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
		...(body && { body: JSON.stringify(body) }),
	});
}

export { req, reqWithAuth };
