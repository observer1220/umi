import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./routes";
import themePlugin from "./store/plugins/themePlugin";
import logPlugin from "./store/plugins/logPlugin";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(themePlugin);
pinia.use(logPlugin);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
