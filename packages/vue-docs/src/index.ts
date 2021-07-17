import type { Plugin } from "vite";
import { ViteDevServer } from "vite";
import fg from "fast-glob";
import DocsRoute from "./route";
import { transformMain } from "./main";
import path from "path";
import * as fs from "fs";
import { createContentRoute } from "./code";
import { toPascalCase } from "./utils";
import Pkg from "../package.json";

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

    async buildStart() {
      const files = await fg([".editorconfig", `${config.root}/**/*.vue`]);
      files.map((item) => {
        if (!item.includes("demo")) {
          Route.add(item);
        }
      });
    },

    config() {
      return {
        server: {
          open: config.open ? config.base : false,
          force: true,
        },
      };
    },

    transform(code, id) {
      if (id.endsWith("main.ts")) {
        const routes = Route.toArray();

        code += `import VueHighlightJS from 'vue3-highlightjs';
        import 'highlight.js/styles/atom-one-light.css';`;

        code += `app.use(VueHighlightJS);`;

        // content
        const childrenCode = routes
          .map((item) => {
            const demoFile = item.file.replace(".vue", ".demo.vue");
            let demoComponentName = toPascalCase(item.name + "-demo");
            let demoComponentCode = "";

            // 导入demo
            if (fs.existsSync(demoFile)) {
              demoComponentCode = fs.readFileSync(demoFile, "utf-8");
              code += `import ${demoComponentName} from '${demoFile}';`;
              code += `app.use(function(Vue) {
                Vue.component('${demoComponentName}', ${demoComponentName})
              });`;
            } else {
              demoComponentName = "";
            }

            const result = transformMain(fs.readFileSync(item.file, "utf-8"));

            return createContentRoute(
              item,
              config,
              demoComponentName,
              result?.content || null,
              demoComponentCode
            );
          })
          .join(",");

        // layout
        code += `${config.vueRoute}.addRoute({
          path: '${config.base}',
          component: () => import("vite-plugin-vue-docs/dist/template/layout.vue"),
          props: {
            content: {
              nav: ${JSON.stringify(routes)}
            }
          },
          children: [${childrenCode}]
        });`;

        code += `setTimeout(() => {${config.vueRoute}.push(router.currentRoute.value.path)}, 50)`;
        return code;
      }

      return null;
    },

    async configureServer(server: ViteDevServer) {
      const { watcher, httpServer } = server;

      httpServer?.on("listening", () => {
        setTimeout(() => {
          console.log(`  ${Pkg.name} ${Pkg.version} route at: \n\n  /docs`);
        });
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
          // hmr("content");
        })
        .on("unlink", (path) => {
          Route.remove(path);
          hmr("nav");
        });
    },
  };
}

export { transformMain };
