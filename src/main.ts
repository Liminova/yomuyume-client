import App from "./App.vue";
import { router } from "./store";
import { createApp } from "vue";
import "./style.scss";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);

app.use(router);
app.mount("#app");
