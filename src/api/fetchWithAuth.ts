async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
	const token = localStorage.getItem("token");

	// Clone the init object and add the Authorization header
	const initWithAuth = {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${token}`,
		},
	};

	return fetch(input, initWithAuth);
}

export default fetchWithAuth;
