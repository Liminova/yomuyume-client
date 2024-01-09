import req from "./req";

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
	async status(): Promise<StatusResponse> {
		try {
			const res = await req("/api/utils/status", "GET");

			return { res, body: (await res.json()) as StatusResponseBody };
		} catch {
			const res = new Response(null, { status: 500 });
			const body = {};

			return { res, body: body as StatusResponseBody };
		}
	},
};

export default otherApi;
