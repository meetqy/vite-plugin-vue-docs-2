import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

import { routes, initVueDocsDemo } from "virtual:vite-plugin-vue-docs";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

const app = createApp(App);

app.use(function (Vue) {
  initVueDocsDemo(Vue);
});

app.use(router);

app.mount("#app");
