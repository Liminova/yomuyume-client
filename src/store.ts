import { ref } from "vue";

function vibrate(): boolean {
	navigator.vibrate(8);
	return true;
}

const isNavDrawerLarge = ref(true);
const isTopBarVisible = ref(true);

export { vibrate, isNavDrawerLarge, isTopBarVisible };
