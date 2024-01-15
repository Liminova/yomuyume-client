import type { GenericResponseBody } from "../types";
import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

type CategoryItemServerResponse = {
	id: string;
	name: string;
	description?: string;
};

type CategoryServerResponse = {
	data: Array<CategoryItemServerResponse>;
};

type CategoriesFnResponse = {
	status: AsyncDataRequestStatus;
	message: string;
	data: Array<{
		id: string;
		name: string;
		description?: string;
	}>;
};

async function categories(): Promise<CategoriesFnResponse> {
	const { data, status } = await useFetch("/api/index/categories", {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		const data_ = data.value as GenericResponseBody;

		return {
			status: status.value,
			message: data_.message,
			data: [],
		};
	}

	const data_ = data.value as CategoryServerResponse;

	return {
		status: status.value,
		message: "",
		data: data_.data,
	};
}

/** For what the server returns */
type FilterItemServerResponse = {
	id: string;
	title: string;
	author?: string;
	categories_id: string;
	release_date?: string;
	favorite_count?: number;
	page_count: number;
	page_read?: number;

	blurhash: string;
	width: number;
	height: number;
	format: string;
};

type FilterServerResponse = {
	data: Array<FilterItemServerResponse>;
};

type FilterFnResponse = {
	status: AsyncDataRequestStatus;
	message: string;
	data: Array<FilterItemServerResponse>;
};

async function filter(body: {
	keywords?: Array<string>;
	category_ids?: Array<string>;
	tag_ids?: Array<number>;
	limit?: number;

	is_reading?: boolean;
	is_finished?: boolean;
	is_bookmarked?: boolean;
	is_favorite?: boolean;

	sort_by?: string;
	sort_order?: string;
}): Promise<FilterFnResponse> {
	const { data, status } = await useFetch("/api/index/filter", {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
		body,
	});

	if (status.value === "error") {
		const data_ = data.value as GenericResponseBody;

		return {
			status: status.value,
			message: data_.message,
			data: [],
		};
	}

	const data_ = data.value as FilterServerResponse | undefined;

	return {
		status: status.value,
		message: "",
		data: (() => {
			if (data_) {
				return data_.data;
			}

			return [];
		})(),
	};
}

/** What the server returns */
type TitleServerResponse = {
	message?: string;
	description?: string; // Error description

	category_id: string;
	title: string;
	author?: string;
	desc?: string;
	release?: string;
	thumbnail: {
		blurhash: string;
		width: number;
		height: number;
		format: string;
	};
	tag_ids: Array<number>;
	pages: Array<{
		id: string;
		format: string;
		description?: string;
	}>;
	favorites?: number;
	bookmarks?: number;
	is_favorite?: boolean;
	is_bookmark?: boolean;
	page_read?: number;
	date_added: string;
	date_updated: string;
};

/** What the below fn returns */
type TitleFnResponse = {
	status: AsyncDataRequestStatus;
	message?: string;
	data?: TitleServerResponse;
};

async function title(id: string): Promise<TitleFnResponse> {
	const { data, status } = await useFetch(`/api/index/title/${id}`, {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		const data_ = data.value as GenericResponseBody;

		return {
			status: status.value,
			message: data_.message,
		};
	}

	const data_ = data.value as TitleServerResponse;

	return {
		status: status.value,
		data: data_,
	};
}

export default { categories, filter, title };
export type {
	FilterItemServerResponse,
	TitleServerResponse,
	CategoryItemServerResponse,
	CategoryServerResponse,
	CategoriesFnResponse,
};
