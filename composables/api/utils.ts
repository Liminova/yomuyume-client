import { req, reqWithAuth } from "./req";

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

type TagResponse = {
	description?: string;
	tags: Array<[number, string]>;
};

export default {
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

	async tags(setErrMsg: (_: string) => void): Promise<TagResponse> {
		try {
			const res = await reqWithAuth("/api/utils/tags", "GET");
			const body = (await res.json()) as TagResponse;

			return body;
		} catch {
			setErrMsg("Failed to get tags");
			return { tags: [] };
		}
	},
};
