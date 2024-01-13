export const homeStore = defineStore("home", () => {
	const coverHeight = ref(300);
	const setCoverHeight = (newVal: number) => (coverHeight.value = newVal);
	const recommendsContainerHeight = 500;
	const gapPixel = 18;
	const snackbarMessage = ref("");
	const setSnackbarMessage = (newVal: string) => (snackbarMessage.value = newVal);

	return {
		coverHeight,
		setCoverHeight,
		recommendsContainerHeight,
		gapPixel,
		snackbarMessage,
		setSnackbarMessage,
	};
});
