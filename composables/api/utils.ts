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

type SsimEvalTitleServerResponse = {
	id: string;

	title: string;
	desc: string;
	tags: Array<number>;

	blurhash: string;
	width: number;
	height: number;
	format: string;
};

type SsimEvalServerResponse = {
	title_a: SsimEvalTitleServerResponse;
	title_b: SsimEvalTitleServerResponse;
	ssim: number;
	description: string;
};

type SsimEvalFnResponse = {
	status: AsyncDataRequestStatus;
	data: {
		titleA: SsimEvalTitleServerResponse;
		titleB: SsimEvalTitleServerResponse;
		ssim: number;
	};
	message: string;
};

// Return 2 random titles and their ssim
async function ssimEval(): Promise<SsimEvalFnResponse> {
	const { data, status, error } = await useFetch("/api/utils/ssim_eval", {
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
			data: {
				titleA: {
					id: "",
					title: "",
					desc: "",
					tags: [],
					blurhash: "",
					width: 0,
					height: 0,
					format: "",
				},
				titleB: {
					id: "",
					title: "",
					desc: "",
					tags: [],
					blurhash: "",
					width: 0,
					height: 0,
					format: "",
				},
				ssim: 0,
			},
			status: status.value,
			message: data_.message ?? "Failed to fetch ssim eval, server doesn't give any reason.",
		};
	}

	const data_ = data.value as SsimEvalServerResponse;

	return {
		data: {
			titleA: data_.title_a,
			titleB: data_.title_b,
			ssim: data_.ssim,
		},
		status: status.value,
		message: "",
	};
}

export default { status, tags, ssimEval };
export type { SsimEvalServerResponse, SsimEvalTitleServerResponse };
