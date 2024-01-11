import instanceAddr from "./base";

const fileApiUrl = {
	/**
	 * Get the url of the thumbnail file for a title.
	 *
	 * @param id the id of the title
	 */
	thumbnail(id: string): string {
		return new URL(`/api/file/thumbnail/${id}`, instanceAddr.value).toString();
	},

	/**
	 * Get the url of the page file for a title.
	 *
	 * @param id the id of the page
	 */
	page(id: string): string {
		return new URL(`/api/file/page/${id}`, instanceAddr.value).toString();
	},
};

export default fileApiUrl;
