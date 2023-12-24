import instanceAddr from "./base";

type StatusResponseBody = {
	server_time: string;
	version: string;
	echo?: string;
	password_less?: boolean;
};

type StatusResponse = {
	res: Response;
	body: StatusResponseBody;
};

const otherApi = {
	newRoute: (path: string) => new URL(`/api/${path}`, instanceAddr.value).toString(),

	async status(): Promise<StatusResponse> {
		try {
			const res = await fetch(this.newRoute("status"), { method: "GET" });

			return { res, body: (await res.json()) as StatusResponseBody };
		} catch {
			const res = new Response(null, { status: 500 });
			const body = {};

			return { res, body: body as StatusResponseBody };
		}
	},
};

export default otherApi;
