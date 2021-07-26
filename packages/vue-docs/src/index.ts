import type { Plugin, UserConfig } from "vite";
import { ViteDevServer } from "vite";
import fg from "fast-glob";
import DocsRoute, { Demo } from "./route";
import { vueToJsonData } from "./main";
import * as fs from "fs";
import { createNavRoute } from "./code";
import { toPascalCase } from "./utils";
import Pkg from "../package.json";
import { hmrClient } from "./hmr";

// 可自定义的配置
export interface CustomConfig {
  // 文档路由地址
  base: string;
  // 组件路径 相对于 src
  componentDir: string;
  // router实例名称
  vueRoute?: string;
  // 显示使用指南
  showUse?: boolean;
  // header
  header?: ConfigHeader;
}

interface ConfigHeader {
  title?: string;
}

export interface Config extends CustomConfig {
  // 组件绝对路径
  root: string;
  // 组件正则匹配
  fileExp: RegExp;
  // vite
  viteConfig?: UserConfig;
}

export default function vueDocs(rawOptions?: CustomConfig): Plugin {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const userPkg = require(`${process.cwd()}/package.json`);

  const config: Config = {
    base: "/docs",
    componentDir: "/components",
    root: "",
    vueRoute: "router",
    fileExp: RegExp(""),
    showUse: true,
    header: {
      title: userPkg.name,
    },
    ...rawOptions,
  };

  config.root = `${process.cwd()}/src${config.componentDir}`;
  config.fileExp = RegExp(`${config.componentDir}\\/.*?.vue$`);

  const Route = DocsRoute.instance(config);

  return {
    name: "vite-plugin-vue-docs",
    enforce: "pre",

    async buildStart() {
      const files = await fg([".editorconfig", `${config.root}/**/*.vue`]);
      files.map((file) => {
        const demo: Demo = {
          file: "",
          name: "",
        };
        const routeName = Route.getRoutePathByFile(file) || "";
        const result = vueToJsonData(fs.readFileSync(file, "utf-8"));

        if (!file.includes("demo")) {
          demo.file = file.replace(".vue", ".demo.vue");
          if (fs.existsSync(demo.file)) {
            demo.name = toPascalCase(routeName.split("/")[1] + "-demo");
          }

          Route.add(file, result?.content, demo.name ? demo : null);
        }
      });
    },

    config(viteConfig) {
      config.viteConfig = viteConfig;
      return {
        server: {
          force: true,
        },
      };
    },

    transform(code, id) {
      if (id.endsWith("main.ts")) {
        const routes = Route.toArray();
        // VueHighlightJS
        code += `import VueHighlightJS from 'vue3-highlightjs';`;
        code += `app.use(VueHighlightJS);`;

        // content
        const childrenCode = routes.map((item) => {
          const { demo } = item;

          // 导入demo
          if (demo && fs.existsSync(demo.file)) {
            demo.code = fs.readFileSync(demo.file, "utf-8");
            code += `import ${demo.name} from '${demo.file}';`;
            code += `app.use(function(Vue) {
              Vue.component('${demo.name}', ${demo.name})
            });`;
          }

          return `{
            path: '${item.path.replace(/\//, "")}',
            name: '${Route.getRouteNameByFile(item.file)}',
            component: () => import("vite-plugin-vue-docs/dist/template/content.vue"),
            props: {
              content: ${JSON.stringify(item.data)},
              componentIs: '${demo?.name || ""}',
              demoCode: \`${demo?.code || ""}\`
            }
          }`;
        });

        if (config.showUse) {
          // add HelloWorld
          childrenCode.push(`{
            path: '',
            component: () => import("vite-plugin-vue-docs/dist/template/HelloWorld.vue")
          }`);

          // add ChangeLog
          childrenCode.push(`{
            path: '${config.base}/changelog',
            component: () => import("vite-plugin-vue-docs/dist/template/ChangeLog.vue")
          }`);
        }

        // layout
        code += `${config.vueRoute}.addRoute({
          path: '${config.base}',
          component: () => import("vite-plugin-vue-docs/dist/template/layout.vue"),
          props: {
            header: ${JSON.stringify(config.header)},
            content: {
              nav: ${JSON.stringify(createNavRoute(routes, config))}
            }
          },
          children: [${childrenCode.join(",")}]
        });`;

        code += `setTimeout(() => {${config.vueRoute}.push(router.currentRoute.value.path)}, 50);`;

        // hmr
        code += `if (import.meta.hot) {
          ${hmrClient.update(config)};
          ${hmrClient.add(config)};
        }`;

        return code;
      }

      return null;
    },

    async configureServer(server: ViteDevServer) {
      const { watcher, httpServer, ws } = server;
      Route.initWs(server);

      httpServer?.on("listening", () => {
        setTimeout(() => {
          console.log(
            `  ${Pkg.name} ${Pkg.version} route at: \n\n  ${config.base} \n`
          );
        });
      });

      // hmr
      watcher
        .on("add", (file) => {
          const result = vueToJsonData(fs.readFileSync(file, "utf-8"));

          Route.add(file, result?.content);
        })
        .on("change", (file) => {
          const result = vueToJsonData(fs.readFileSync(file, "utf-8"));
          Route.change(file, result?.content);
        })
        .on("unlink", (path) => {
          console.log("remove", path);
        });
    },
  };
}

export { vueToJsonData };
