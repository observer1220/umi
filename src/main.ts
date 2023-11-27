import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./routes";
import themePlugin from "./store/plugins/themePlugin";
import logPlugin from "./store/plugins/logPlugin";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const pinia = createPinia();
pinia.use(themePlugin);
pinia.use(logPlugin);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
