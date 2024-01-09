import { ref } from "vue";

type GenericResponseBody = {
	description: string;
	message: string;
};

const instanceAddr = ref(localStorage.getItem("instance-address") ?? "http://localhost:3000");

export default instanceAddr;
export type { GenericResponseBody };
