import { WebSocketServer } from "vite";
import { Route } from "./route";
import { Config } from "./index";

export const hmrServer = {
  update(ws: WebSocketServer, route: Route): void {
    ws.send({
      type: "custom",
      event: "special-update",
      data: {
        content: route.data,
        name: route.name,
        path: route.path,
      },
    });
  },

  add(ws: WebSocketServer, route: Route, routes: Route[]): void {
    ws.send({
      type: "custom",
      event: "special-add",
      data: {
        content: route.data,
        name: route.name,
        path: route.path,
        routes,
      },
    });
  },

  remove(ws: WebSocketServer, route: Route, routes: Route[]): void {
    ws.send({
      type: "custom",
      event: "special-add",
      data: {
        path: route.path,
        routes,
      },
    });
  },
};

export const hmrClient = {
  update(config: Config): string {
    return `import.meta.hot.on("special-update", (data) => {
      const { content, name, path } = data;
      ${config.vueRoute}.push({
        path,
        name,
        params: {
          content: JSON.stringify(content),
        },
      });
    })`;
  },

  add(config: Config): string {
    return `import.meta.hot.on("special-add", (data) => {
        const { content, name, path } = data;
        ${config.vueRoute}.addRoute("/docs", {
          path,
          name,
          component: () => import("vite-plugin-vue-docs/dist/template/content.vue"),
          params: {
            content: JSON.stringify(content),
          },
        });
        
        setTimeout(() => {${config.vueRoute}.push('/docs')}, 50);
      })`;
  },

  // remove(config: Config): string
};
