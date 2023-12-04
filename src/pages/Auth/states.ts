import AuthType from "./AuthType";
import { State } from "../../utils/variables/store";
import { ref } from "vue";

const fetchInstanceInfoState = ref(State.Idle);
const authType = ref(AuthType.None);

const email = ref("");
const isEmailValidState = ref(false);

const sendCodeState = ref(State.Idle);

const loginState = ref(State.Idle);
const loginCode = ref("");

export {
	fetchInstanceInfoState,
	authType,
	email,
	isEmailValidState,
	sendCodeState,
	loginState,
	loginCode,
};
