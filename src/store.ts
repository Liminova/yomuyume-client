import { ref } from "vue";

enum State {
	Idle = "Idle",
	Loading = "Loading",
	Loaded = "Loaded",
	Error = "Error",
}

function vibrate(): boolean {
	navigator.vibrate(8);
	return true;
}

const isNavDrawerLarge = ref(true);
const isTopBarVisible = ref(true);

export { vibrate, isNavDrawerLarge, isTopBarVisible, State };
