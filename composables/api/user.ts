import { reqWithAuth } from "./req";
import parseRespJson from "../functions/parseRespJson";
import type { GenericResponseBody } from "./apiStore";

enum Action {
	PUT = "PUT",
	DELETE = "DELETE",
}

export { Action };

/** if res.ok, the GenericResponse is empty */
async function favorite(
	titleId: string,
	action: Action,
	setErrMsg: (_: string) => void
): Promise<boolean> {
	const response = await reqWithAuth(`/api/user/favorite/${titleId}`, action);

	if (!response.ok) {
		void parseRespJson(response, setErrMsg).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				setErrMsg(body.message);
			}
		});
	}

	return Promise.resolve(response.ok);
}

/** if res.ok, the GenericResponse is empty */
async function bookmark(
	titleId: string,
	action: Action,
	setErrMsg: (_: string) => void
): Promise<boolean> {
	const response = await reqWithAuth(`/api/user/bookmark/${titleId}`, action);

	if (!response.ok) {
		void parseRespJson(response, setErrMsg).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				setErrMsg(body.message);
			}
		});
	}

	return Promise.resolve(response.ok);
}

export default { favorite, bookmark };
