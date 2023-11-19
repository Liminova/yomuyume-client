<script setup lang="ts">
import { isAvifSupported, isJxlSupported } from "../utils/imageFormatSupport";
import BlurhashWorker from "../workers/blurhash?sharedworker";
import PolyfillWorker from "../workers/polyfill?sharedworker";
import { ref } from "vue";

const props = defineProps({
	src: { type: String, required: true },
	format: { type: String, required: true },
	blurhash: { type: String, required: true },
	width: { type: Number, required: true },
	height: { type: Number, required: true },
	class: { type: String, default: "" },
	draggable: { type: Boolean, default: false },
});

const blurhashBlob = ref("");

(() => {
	const worker = new BlurhashWorker();

	worker.port.start();

	// TODO: get max-age from server
	worker.port.postMessage({
		blurhash: props.blurhash,
		width: props.width,
		height: props.height,
		maxAge: 1209600,
	});
	worker.port.onmessage = (event: MessageEvent<string>) => {
		blurhashBlob.value = event.data;
		worker.port.close();
	};
})();

const decodedImgBlob = ref("");

(async () => {
	if (
		((await isJxlSupported()) && props.format === "jxl") ||
		((await isAvifSupported()) && props.format === "avif")
	) {
		decodedImgBlob.value = props.src;
		return;
	}

	const worker = new PolyfillWorker();

	worker.port.start();

	// TODO: get max-age from server
	worker.port.postMessage({ path: props.src, format: props.format, maxAge: 1209600 });
	worker.port.onmessage = (event: MessageEvent<string>) => {
		decodedImgBlob.value = event.data;
		worker.port.close();
	};
})().catch(() => {
	/** */
});
</script>

<template>
	<div class="relative w-full" :class="props.class">
		<img class="left-0 top-0" :src="blurhashBlob" :draggable="props.draggable" />
		<Transition>
			<img
				v-show="decodedImgBlob"
				class="absolute left-0 top-0"
				:src="decodedImgBlob"
				:draggable="props.draggable"
			/>
		</Transition>
	</div>
</template>
