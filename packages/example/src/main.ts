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
  import.meta.hot.on("special-add", (data) => {
    console.log(data);
    // router.addRoute("/docs", {
    //   path,
    //   name,
    //   component: () => import("vite-plugin-vue-docs/dist/template/content.vue"),
    //   props: {
    //     content: JSON.stringify(content),
    //   },
    // });
  });

  import.meta.hot.on("special-remove", (data) => {
    const { path } = data;
    router.removeRoute(path);
  });
}

app.use(router);

app.mount("#app");
