import instanceAddr from "./api/apiStore";
import fileUrl from "./api/fileUrl";
import index from "./api/index";
import { req, reqWithAuth } from "./api/req";
import user, { Action } from "./api/user";
import utils from "./api/utils";
import type { GenericResponseBody } from "./api/apiStore";
import type {
	FilterTitleResponse,
	TitleResponseBody,
	CategoryResponseBody,
	CategoryResponse,
} from "./api/index";

export {
	instanceAddr,
	fileUrl as fileApiUrl,
	index as indexApi,
	user as userApi,
	utils as utilsApi,
	req,
	reqWithAuth,
	Action,
};

export type {
	GenericResponseBody,
	FilterTitleResponse,
	TitleResponseBody,
	CategoryResponseBody,
	CategoryResponse,
};
