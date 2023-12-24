import { ref } from "vue";

type GenericResponseBody = {
	description: string;
	message: string;
};

type GenericResponse = {
	res: Response;
	body: GenericResponseBody;
};

const instanceAddr = ref("");

export default instanceAddr;
export type { GenericResponse, GenericResponseBody };
