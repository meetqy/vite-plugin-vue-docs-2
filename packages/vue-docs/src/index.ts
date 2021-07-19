import type { Plugin, UserConfig } from "vite";
import { ViteDevServer } from "vite";
import fg from "fast-glob";
import DocsRoute from "./route";
import { vueToJsonData } from "./main";
import path from "path";
import * as fs from "fs";
import { createContentRoute, createNavRoute } from "./code";
import { toPascalCase } from "./utils";
import Pkg from "../package.json";

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
      files.map((item) => {
        if (!item.includes("demo")) {
          Route.add(item);
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

          const result = vueToJsonData(fs.readFileSync(item.file, "utf-8"));

          return createContentRoute(
            item,
            config,
            demoComponentName,
            result?.content || null,
            demoComponentCode
          );
        });

        if (config.showUse) {
          // add HelloWorld
          childrenCode.push(`{
            path: '',
            component: import("vite-plugin-vue-docs/dist/template/HelloWorld.vue")
          }`);

          // add ChangeLog
          childrenCode.push(`{
            path: '/${config.base}/changelog',
            component: import("vite-plugin-vue-docs/dist/template/ChangeLog.vue")
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

        code += `setTimeout(() => {${config.vueRoute}.push(router.currentRoute.value.path)}, 50)`;
        return code;
      }

      return null;
    },

    async configureServer(server: ViteDevServer) {
      const { watcher, httpServer } = server;

      httpServer?.on("listening", () => {
        setTimeout(() => {
          console.log(
            `  ${Pkg.name} ${Pkg.version} route at: \n\n  ${config.base} \n`
          );
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

export { vueToJsonData };
