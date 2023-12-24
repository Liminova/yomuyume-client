import instanceAddr from "./base";
import fetchWithAuth from "./fetchWithAuth";
import type { GenericResponse, GenericResponseBody } from "./base";

enum Action {
	PUT = "PUT",
	DELETE = "DELETE",
}

const userApi = {
	newRoute: (path: string) => new URL(`/api/user/${path}`, instanceAddr.value).toString(),

	async check(): Promise<boolean> {
		const res = await fetchWithAuth(this.newRoute("check"), { method: "GET" });

		console.log(await res.json());
		return res.ok;
	},

	async modify(username: string, email: string, password: string): Promise<GenericResponse> {
		const res = await fetch(this.newRoute("modify"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});

		return { res, body: (await res.json()) as GenericResponseBody };
	},

	async addFavorite(titleId: string, action: Action): Promise<boolean> {
		const res = await fetch(this.newRoute(`favorite/${titleId}`), {
			method: action,
		});

		return res.ok;
	},

	async addBookmark(titleId: string, action: Action): Promise<boolean> {
		const res = await fetch(this.newRoute(`bookmark/${titleId}`), {
			method: action,
		});

		return res.ok;
	},
};

export default userApi;
