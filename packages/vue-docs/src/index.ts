import type { HmrContext, Plugin, UserConfig } from "vite";
import { ViteDevServer } from "vite";
import fg from "fast-glob";
import DocsRoute, { Demo } from "./route";
import { vueToJsonData } from "./main";
import path from "path";
import * as fs from "fs";
import { createNavRoute } from "./code";
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
      files.map((file) => {
        const demo: Demo = {
          file: "",
          name: "",
        };
        const routeName = Route.getRouteNameByFile(file) || "";
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
        // 引入content
        code += `import VueDocsContent from "vite-plugin-vue-docs/dist/template/content.vue";`;
        code += `import Hoc from "vite-plugin-vue-docs/dist/template/hoc.js";`;

        // VueHighlightJS
        code += `import VueHighlightJS from 'vue3-highlightjs';`;
        code += `app.use(VueHighlightJS);`;
        code += `const VueDocsData = {"name":"el-aside","slots":{"h3":"Slots","table":{"headers":["名称","说明","返回参数"],"rows":[["default","-","-"]]}},"props":{"h3":"Props","table":{"headers":["参数","说明","填"],"rows":[["width"," 你好","string","300px","false"]]}}};`;

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
            path: '${item.path.replace(config.base + "/", "")}',
            component: () => Hoc(VueDocsContent),
            props: {
              content: VueDocsData,
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

        code += `setTimeout(() => {${config.vueRoute}.push(router.currentRoute.value.path)}, 50)`;
        return code;
      }

      return null;
    },

    handleHotUpdate(ctx: HmrContext) {
      console.log(ctx.modules);
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

      watcher
        .on("add", (path) => {
          const result = vueToJsonData(path);
          Route.add(path, result?.content);
        })
        .on("change", (path) => {
          const result = vueToJsonData(fs.readFileSync(path, "utf-8"));
          console.log(JSON.stringify(result?.content));
          Route.change(path, result?.content);
        })
        .on("unlink", (path) => {
          Route.remove(path);
        });
    },
  };
}

export { vueToJsonData };
