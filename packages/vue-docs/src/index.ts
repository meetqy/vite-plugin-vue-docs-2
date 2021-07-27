import type { Plugin, UserConfig } from "vite";
import { ViteDevServer } from "vite";
import fg from "fast-glob";
import { vueToJsonData } from "./main";
import * as fs from "fs";
import Pkg from "../package.json";
import DocsRoute from "./route";
import { MODULE_NAME } from "./constants";

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

    resolveId(id) {
      console.log(id, MODULE_NAME);
      return null;
    },

    // load(id) {
    //   // console.log(id);
    //   return null;
    // },

    config(viteConfig) {
      config.viteConfig = viteConfig;
      return {
        server: {
          force: true,
        },
      };
    },

    async configureServer(server: ViteDevServer) {
      const { watcher, httpServer } = server;
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
        .on("unlink", (file) => {
          Route.remove(file);
        });
    },
  };
}

export { vueToJsonData };
