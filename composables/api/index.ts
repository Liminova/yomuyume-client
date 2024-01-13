import { reqWithAuth } from "./req";
import parseRespJson from "../functions/parseRespJson";
import type { GenericResponseBody } from "./apiStore";

type FilterTitleResponse = {
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
};

type FilterResponseBody = {
	description: string;
	message: string;
	data: Array<FilterTitleResponse>;
};

type TitleResponseBody = {
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
	};
	tag_ids: Array<number>;
	pages: Array<{
		id: string;
		title_id: string;
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

type CategoryResponse = {
	id: string;
	name: string;
	description?: string;
};

type CategoryResponseBody = {
	data: Array<CategoryResponse>;
};

async function categories(setErrMsg: (_: string) => void): Promise<Array<CategoryResponse>> {
	const response = await reqWithAuth("/api/index/categories", "GET");

	if (response.ok) {
		const body = (await parseRespJson(response, setErrMsg)) as CategoryResponseBody;

		return body.data;
	}

	void parseRespJson(response, setErrMsg).then((body_) => {
		const body = body_ as GenericResponseBody;

		if (body.message) {
			setErrMsg(body.message);
		}
	});

	return [];
}

async function filter(
	params: {
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
	},
	setErrMsg: (_: string) => void
): Promise<Array<FilterTitleResponse>> {
	const response = await reqWithAuth("/api/index/filter", "POST", params);

	if (response.status === 204 || !response.ok) {
		return [];
	}

	return parseRespJson(response, setErrMsg).then((body_) => {
		const body = body_ as FilterResponseBody;

		if (body.message) {
			setErrMsg(body.message);
		}

		return body.data;
	});
}

async function title(
	id: string,
	setErrMsg: (_: string) => void
): Promise<[Response, TitleResponseBody]> {
	const response = await reqWithAuth(`/api/index/title/${id}`, "GET");

	const body = await parseRespJson(response, setErrMsg).then((body_) => {
		const body = body_ as TitleResponseBody;

		if (body.description && body.description !== "OK") {
			setErrMsg(body.description);
		}

		return body;
	});

	return [response, body];
}

export default { categories, filter, title };
export type { FilterTitleResponse, TitleResponseBody, CategoryResponseBody, CategoryResponse };
