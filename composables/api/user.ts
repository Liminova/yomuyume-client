import type { GenericResponseBody } from "../types";
import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

async function favorite(
	titleId: string,
	action: "DELETE" | "PUT"
): Promise<{
	status: AsyncDataRequestStatus;
	message: string;
}> {
	const { data, status } = await useFetch(`/api/user/favorite/${titleId}`, {
		baseURL: globalStore.instanceAddr,
		method: action,
		headers: {
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	return {
		status: status.value,
		message: (data.value as GenericResponseBody).message,
	};
}

async function bookmark(
	titleId: string,
	action: "DELETE" | "PUT"
): Promise<{
	status: AsyncDataRequestStatus;
	message: string;
}> {
	const { data, status } = await useFetch(`/api/user/bookmark/${titleId}`, {
		baseURL: globalStore.instanceAddr,
		method: action,
		headers: {
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	return {
		status: status.value,
		message: (data.value as GenericResponseBody).message,
	};
}

export default { favorite, bookmark };
