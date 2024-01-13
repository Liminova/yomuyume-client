type GenericResponseBody = {
	description: string;
	message: string;
};

const apiStore = defineStore("api", () => {
	const instanceAddr = ref(localStorage.getItem("instance-address") ?? "http://localhost:3000");

	return { instanceAddr };
});

export default apiStore;
export type { GenericResponseBody };
