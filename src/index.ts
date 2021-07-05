import type { Plugin } from "vite";
import { ViteDevServer } from "vite";
import glob from "glob";
import http from "http";
import DocsRoute from "./route";
import { serverLog } from "./utils";

export interface Options {
  // 文档路由地址
  base?: string;
  // 组件路径 相对于 src
  componentDir?: string;
}

export interface Config extends Options {
  // 组件绝对路径
  root: string;

  // 组件正则匹配
  fileExp: RegExp;
}

export default function vueDocs(rawOptions: Options): Plugin {
  let options: Options = {
    base: "/docs",
    componentDir: "/components",
    ...rawOptions,
  };

  let config = {
    root: `${process.cwd()}/src${options.componentDir}`,
    fileExp: RegExp(`${options.componentDir}\\/.*?.vue$`),
    ...options,
  };

  const Route = DocsRoute.instance(config);

  return {
    name: "vite-plugin-vue-docs",
    async configureServer(server: ViteDevServer) {
      const {
        watcher,
        middlewares,
        httpServer,
        config: resolvedConfig,
      } = server;

      httpServer?.on("listening", () => {
        serverLog(resolvedConfig, config);
      });

      glob(`${config.root}/**/*.vue`, {}, (err, files) => {
        if (err) throw err;
        files.map((file) => {
          Route.add(file);
        });
      });

      // 构建路由
      middlewares.use(`${options.base}`, (req: http.IncomingMessage, res) => {
        const result = Route.get(req.url);
        if (result) {
          res.writeHead(200, {
            "content-type": "text/html;charset=utf8",
          });

          res.end(result.html);
        } else {
          res.writeHead(404);
          res.end(JSON.stringify(Object.keys(Route.get())));
        }
      });

      watcher
        .on("add", (path) => Route.add(path))
        .on("change", (path) => Route.change(path))
        .on("unlink", (path) => Route.remove(path));
    },
  };
}
