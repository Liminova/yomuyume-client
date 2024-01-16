import type { GenericServerResponse } from "../types";
import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

async function favorite(
	titleId: string,
	action: "DELETE" | "PUT"
): Promise<{
	status: AsyncDataRequestStatus;
	message: string;
}> {
	const { status, error } = await useFetch(`/api/user/favorite/${titleId}`, {
		baseURL: globalStore.instanceAddr,
		method: action,
		headers: {
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return {
			status: status.value,
			message: data_.message ?? "Failed to favorite, server doesn't give any reason.",
		};
	}

	return {
		status: status.value,
		message: "Added to favorite.",
	};
}

async function bookmark(
	titleId: string,
	action: "DELETE" | "PUT"
): Promise<{
	status: AsyncDataRequestStatus;
	message: string;
}> {
	const { status, error } = await useFetch(`/api/user/bookmark/${titleId}`, {
		baseURL: globalStore.instanceAddr,
		method: action,
		headers: {
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return {
			status: status.value,
			message: data_.message ?? "Failed to bookmark, server doesn't give any reason.",
		};
	}

	return {
		status: status.value,
		message: "Added to bookmark.",
	};
}

export default { favorite, bookmark };
