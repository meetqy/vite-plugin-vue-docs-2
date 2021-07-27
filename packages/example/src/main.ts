import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import routes from "virtual:routes";

console.log(routes);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("./views/index.vue") },
    { path: "/setup", component: () => import("./views/setup.vue") },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
