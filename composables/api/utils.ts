import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

type StatusServerResponse = {
	server_time: string;
	version: string;
	echo?: string;
	password_less?: boolean;
};

type StatusFnResponse = {
	data: StatusServerResponse;
	status: AsyncDataRequestStatus;
};

async function status(): Promise<StatusFnResponse> {
	const { data, status } = await useFetch("/api/utils/status", {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	return {
		data: data.value as StatusServerResponse,
		status: status.value,
	};
}

type TagsServerResponse = {
	tags: Array<[number, string]>;
};

type TagsFnResponse = {
	tags: Array<[number, string]>;
	message: string;
};

async function tags(): Promise<TagsFnResponse> {
	const { data, status, error } = await useFetch("/api/utils/tags", {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return {
			tags: [],
			message: data_.message ?? "Failed to fetch tags, server doesn't give any reason.",
		};
	}

	const data_ = data.value as TagsServerResponse;

	return { tags: data_.tags, message: "" };
}

export default { status, tags };
