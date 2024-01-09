import instanceAddr from "./base";
import { reqWithAuth } from "./req";
import parseRespJson from "../utils/functions/parseRespJson";
import type { GenericResponseBody } from "./base";
import type { Ref } from "vue";

enum Action {
	PUT = "PUT",
	DELETE = "DELETE",
}

const userApi = {
	newRoute: (path: string) => new URL(`/api/user/${path}`, instanceAddr.value).toString(),

	/** if res.ok, the GenericResponse is empty */
	async favorite(titleId: string, action: Action, errRef: Ref<string>): Promise<boolean> {
		const response = await reqWithAuth(`/api/user/favorite/${titleId}`, action);

		if (!response.ok) {
			void parseRespJson(response, errRef).then((body_) => {
				const body = body_ as GenericResponseBody;

				if (body.message) {
					errRef.value = body.message;
				}
			});
		}

		return Promise.resolve(response.ok);
	},

	/** if res.ok, the GenericResponse is empty */
	async bookmark(titleId: string, action: Action, errRef: Ref<string>): Promise<boolean> {
		const response = await reqWithAuth(`/api/user/bookmark/${titleId}`, action);

		if (!response.ok) {
			void parseRespJson(response, errRef).then((body_) => {
				const body = body_ as GenericResponseBody;

				if (body.message) {
					errRef.value = body.message;
				}
			});
		}

		return Promise.resolve(response.ok);
	},
};

export default userApi;
