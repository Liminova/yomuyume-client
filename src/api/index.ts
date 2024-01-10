import instanceAddr from "./base";
import { reqWithAuth } from "./req";
import parseRespJson from "../utils/functions/parseRespJson";
import type { GenericResponseBody } from "./base";
import type { Ref } from "vue";

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
	release_date?: string;
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

const indexApi = {
	newRoute: (path: string) => new URL(`/api/index/${path}`, instanceAddr.value).toString(),

	async categories(errRef: Ref<string>): Promise<Array<CategoryResponse>> {
		const response = await reqWithAuth("/api/index/categories", "GET");

		if (response.ok) {
			const body = (await parseRespJson(response, errRef)) as CategoryResponseBody;

			return body.data;
		}

		void parseRespJson(response, errRef).then((body_) => {
			const body = body_ as GenericResponseBody;

			if (body.message) {
				errRef.value = body.message;
			}
		});

		return [];
	},

	async filter(
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
		errRef: Ref<string>
	): Promise<Array<FilterTitleResponse>> {
		const response = await reqWithAuth("/api/index/filter", "POST", params);

		if (response.status === 204 || !response.ok) {
			return [];
		}

		return parseRespJson(response, errRef).then((body_) => {
			const body = body_ as FilterResponseBody;

			if (body.message) {
				errRef.value = body.message;
			}

			return body.data;
		});
	},

	async title(id: string, errRef: Ref<string>): Promise<[Response, TitleResponseBody]> {
		const response = await reqWithAuth(`/api/index/title/${id}`, "GET");

		return [response, (await parseRespJson(response, errRef)) as TitleResponseBody];
	},
};

export default indexApi;
export type {
	FilterTitleResponse as FilterTitleResponseBody,
	TitleResponseBody,
	CategoryResponseBody,
	CategoryResponse,
};
