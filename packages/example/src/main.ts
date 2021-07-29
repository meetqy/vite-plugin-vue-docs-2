import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import { routes, initVueDocsDemo } from "virtual:vite-plugin-vue-docs";

console.log(routes);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // routes: [
  //   { path: "/", component: () => import("./views/index.vue") },
  //   { path: "/setup", component: () => import("./views/setup.vue") },
  // ],
});

const app = createApp(App);

app.use(function (Vue) {
  initVueDocsDemo(Vue);
});
app.use(router);

app.mount("#app");
