import type { Plugin } from "vite";
import { ViteDevServer } from "vite";
import glob from "glob";
import http from "http";
import fs from "fs";
import DocsRoute from "./route";
import { serverLog } from "./utils";
import { transformMain } from "./main";
import Template from "./template";

// 可自定义的配置
export interface UserConfig {
  // 文档路由地址 test
  base?: string;
  // 组件路径 相对于 src
  componentDir?: string;
  // 打开浏览器
  open?: boolean;
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
    open: true,
    root: "",
    fileExp: RegExp(""),
    ...rawOptions,
  };

  config.root = `${process.cwd()}/src${config.componentDir}`;
  config.fileExp = RegExp(`${config.componentDir}\\/.*?.vue$`);

  const Route = DocsRoute.instance(config);

  return {
    name: "vite-plugin-vue-docs",
    config() {
      return {
        server: {
          open: config.open ? config.base : false,
          force: true,
        },
      };
    },
    async configureServer(server: ViteDevServer) {
      const { watcher, middlewares, httpServer } = server;

      httpServer?.on("listening", () => {
        setTimeout(() => {
          serverLog(config);
        });
      });

      // 生成路由
      glob(`${config.root}/**/*.vue`, {}, (err, files) => {
        if (err) throw err;
        files.map((file) => {
          Route.add(file);
        });
      });

      // 构建路由
      middlewares.use(`${config.base}`, (req: http.IncomingMessage, res) => {
        const filepath = Route.get(req.url) as string;
        const routeArray = Route.toArray();
        if (filepath) {
          const result = transformMain(
            fs.readFileSync(filepath, "utf-8"),
            routeArray,
            req.url as string
          );

          if (result) {
            res.writeHead(200, {
              "content-type": "text/html;charset=utf8",
            });
            res.end(result.html);
          }
        } else {
          res.writeHead(404);
          const result = Template({
            route: {
              path: req.url,
              list: routeArray,
            },
          });
          res.end(result);
        }
      });

      //
      watcher
        .on("add", (path) => Route.add(path))
        .on("change", (path) => Route.change(path))
        .on("unlink", (path) => Route.remove(path));
    },
  };
}
