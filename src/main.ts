import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./routes";
import themePlugin from "./store/plugins/themePlugin";
import logPlugin from "./store/plugins/logPlugin";

const app = createApp(App);

const pinia = createPinia();
pinia.use(themePlugin);
pinia.use(logPlugin);

app.use(router);
app.use(pinia);

app.mount("#app");
