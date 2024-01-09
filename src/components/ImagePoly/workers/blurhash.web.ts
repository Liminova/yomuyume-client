import blurhashDecode from "./blurhashDecode";

self.onmessage = async (event: MessageEvent<[string, number, number]>) => {
	self.postMessage(await blurhashDecode(event.data));
};
