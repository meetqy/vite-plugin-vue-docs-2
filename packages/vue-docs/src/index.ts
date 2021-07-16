import type { Plugin } from "vite";
import { ViteDevServer } from "vite";
import fg from "fast-glob";
import DocsRoute from "./route";
import { transformMain } from "./main";
import path from "path";
import * as fs from "fs";

// 可自定义的配置
export interface UserConfig {
  // 文档路由地址
  base?: string;
  // 组件路径 相对于 src
  componentDir?: string;
  // 打开浏览器
  open?: boolean;
  // router实例名称
  vueRoute?: string;
}

export interface Config extends UserConfig {
  // 组件绝对路径
  root: string;

  // 组件正则匹配
  fileExp: RegExp;
}

export default function vueDocs(rawOptions?: UserConfig): Plugin {
  const config: Config = {
    base: "/docs",
    componentDir: "/components",
    open: false,
    root: "",
    vueRoute: "router",
    fileExp: RegExp(""),
    ...rawOptions,
  };

  config.root = `${process.cwd()}/src${config.componentDir}`;
  config.fileExp = RegExp(`${config.componentDir}\\/.*?.vue$`);

  const Route = DocsRoute.instance(config);

  return {
    name: "vite-plugin-vue-docs",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("main.ts")) {
        const routes = Route.toArray();
        code += `${config.vueRoute}.addRoute({
          path: '${config.base}',
          component: import("vite-plugin-vue-docs/dist/template/layout.vue"),
          props: {
            content: {
              nav: ${JSON.stringify(routes)}
            }
          },
          children: [${routes
            .map((item) => {
              const result = transformMain(fs.readFileSync(item.file, "utf-8"));
              return `{ 
                path: '${item.path.replace(config.base + "/", "")}', 
                component: import("vite-plugin-vue-docs/dist/template/content.vue"),
                props: {
                  content: ${JSON.stringify(result?.content)}
                }
              }`;
            })
            .join(",")}]
        });`;

        code += `setTimeout(() => {${config.vueRoute}.push(router.currentRoute.value.path)})`;
        return code;
      }

      return null;
    },

    config() {
      return {
        server: {
          open: config.open ? config.base : false,
          force: true,
        },
      };
    },

    async configureServer(server: ViteDevServer) {
      const { watcher } = server;

      const files = await fg([".editorconfig", `${config.root}/**/*.vue`]);
      files.map((item) => {
        Route.add(item);
      });

      // 原理: 更新template里面的内容，可以触发vue-router的hmr
      function hmr(filename: string) {
        const nav = path.join(
          process.cwd(),
          `./node_modules/vite-plugin-vue-docs/dist/template/${filename}.vue`
        );

        fs.writeFileSync(
          nav,
          fs
            .readFileSync(nav, "utf-8")
            .replace(/<style>.*?<\/style>/, `<style>.a${Date.now()}</style>`)
        );
      }

      watcher
        .on("add", (path) => {
          Route.add(path);
          hmr("nav");
        })
        .on("change", (path) => {
          Route.change(path);
          hmr("content");
        })
        .on("unlink", (path) => {
          Route.remove(path);
          hmr("nav");
        });
    },
  };
}

export { transformMain };
