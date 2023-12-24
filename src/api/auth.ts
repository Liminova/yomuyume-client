import instanceAddr from "./base";
import type { GenericResponse, GenericResponseBody } from "./base";

type LoginResponseBody = {
	token: string;
	description: string;
};

type LoginResponse = {
	res: Response;
	body: LoginResponseBody;
};

const authApi = {
	newRoute: (path: string) => new URL(`/api/auth/${path}`, instanceAddr.value).toString(),

	async register(username: string, email: string, password: string): Promise<GenericResponse> {
		const res = await fetch(this.newRoute("register"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});

		return { res, body: (await res.json()) as GenericResponseBody };
	},
	async login(login: string, password: string): Promise<LoginResponse> {
		const res = await fetch(this.newRoute("login"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ login, password }),
		});
		const body = (await res.json()) as LoginResponseBody;

		localStorage.setItem("token", body.token);
		return { res, body };
	},
	logout() {
		return fetch(this.newRoute("logout"), { method: "GET" });
	},
	async forget(login: string): Promise<GenericResponse> {
		const res = await fetch(this.newRoute(`forget`), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ login }),
		});

		return { res, body: (await res.json()) as GenericResponseBody };
	},
	async reset(code: string, password: string): Promise<GenericResponse> {
		const res = await fetch(this.newRoute("reset"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ code, password }),
		});

		return { res, body: (await res.json()) as GenericResponseBody };
	},
};

export default authApi;
