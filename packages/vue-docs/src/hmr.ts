import { WebSocketServer } from "vite";
import DocsRoute, { Route } from "./route";
import { Config } from "./index";
import { createNavRoute } from "./code";

export const hmrServer = {
  update(ws: WebSocketServer, route: Route): void {
    console.log(route);
    ws.send({
      type: "full-reload",
    });
    // ws.send({
    //   type: "custom",
    //   event: "special-update",
    //   data: {
    //     content: route.data,
    //     name: route.name,
    //     path: route.path,
    //   },
    // });
  },

  add(route: Route, DocsRoute: DocsRoute): void {
    const { server, config } = DocsRoute;
    const routes = DocsRoute.toArray();
    server?.ws.send({
      type: "custom",
      event: "special-add",
      data: {
        content: route.data,
        name: route.name,
        path: route.path,
        routes: createNavRoute(routes, config),
        header: config.header,
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
      const { path, name } = data;
      ${config.vueRoute}.push({
        path,
        name,
        params: {
          content: JSON.stringify(data),
        },
      });
    });`;
  },

  add(config: Config): string {
    return `import.meta.hot.on("special-add", (data) => {
        const { content, name, path } = data;
        ${config.vueRoute}.addRoute("docs", {
          path: path.replace(/\\//, ''),
          name,
          component: () => import("vite-plugin-vue-docs/dist/template/content.vue"),
          params: {
            content: JSON.stringify(content),
          },
        });
        
        setTimeout(() => {${config.vueRoute}.push('${config.base}'+path)}, 50);
      })`;
  },

  // remove(config: Config): string
};
