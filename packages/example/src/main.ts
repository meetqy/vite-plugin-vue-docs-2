import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("./views/index.vue") },
    { path: "/setup", component: () => import("./views/setup.vue") },
  ],
});

const app = createApp(App);

if (import.meta.hot) {
  import.meta.hot.on("special-remove", (data) => {
    console.log("remove", data);
  });

  import.meta.hot.on("special-add", (data) => {
    console.log("add", data);
  });

  import.meta.hot.on("special-update", (data) => {
    console.log("update", data);
    const { path, name } = data;
    router.push({
      path,
      name,
      params: {
        content: JSON.stringify(data),
      },
    });
  });
}

app.use(router);

app.mount("#app");
