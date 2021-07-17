import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("./views/index.vue") },
    { path: "/setup", component: () => import("./views/setup.vue") },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
