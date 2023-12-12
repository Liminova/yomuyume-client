import { State } from "../../utils/variables/store";
import { ref } from "vue";

const fetchInstanceInfoState = ref(State.Idle);
const isPasswordless = ref(false);

const email = ref("");
const isEmailValidState = ref(false);

const sendCodeState = ref(State.Idle);

const loginState = ref(State.Idle);
const loginCode = ref("");

export {
	email,
	fetchInstanceInfoState,
	isEmailValidState,
	isPasswordless,
	loginCode,
	loginState,
	sendCodeState,
};
