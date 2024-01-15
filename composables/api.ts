import auth from "./api/auth";
import fileUrl from "./api/fileUrl";
import index from "./api/index";
import user from "./api/user";
import utils from "./api/utils";
import type {
	FilterItemServerResponse,
	TitleServerResponse,
	CategoryServerResponse,
	CategoriesFnResponse,
} from "./api/index";

export {
	auth as authApi,
	fileUrl as fileApiUrl,
	index as indexApi,
	user as userApi,
	utils as utilsApi,
	Action,
};

export type {
	FilterItemServerResponse as FilterTitleResponse,
	TitleServerResponse as TitleResponseBody,
	CategoryServerResponse as CategoryResponseBody,
	CategoriesFnResponse as CategoryResponse,
};
