import instanceAddr from "./base";

const fileApiUrl = {
	thumbnail(id: string): string {
		return new URL(`/api/file/thumbnail/${id}`, instanceAddr.value).toString();
	},

	page(id: string): string {
		return new URL(`/api/file/page/${id}`, instanceAddr.value).toString();
	},
};

export default fileApiUrl;
