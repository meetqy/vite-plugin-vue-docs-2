import type { Plugin } from "vite";
import { ViteDevServer } from "vite";
import glob from "glob";
import fs from "fs";
import humps from "humps";
import { transformMain } from "./main";
import http from "http";

function vueDocs(): Plugin {
  return {
    name: "vite-plugin-vue-docs",
    async configureServer(server: ViteDevServer) {
      const { watcher, middlewares } = server;
      const root: string = `${process.cwd()}/src/components`;

      let docs: { [key: string]: string | null } = {};

      glob(`${root}/**/*.vue`, {}, (err, files) => {
        if (err) throw err;
        files.map((file) => {
          const path = file.replace(root, "").replace(".vue", "");
          docs[humps.decamelize(path, { separator: "-" })] = transformMain(
            fs.readFileSync(file, "utf-8")
          );
        });
      });

      // 构建路由
      middlewares.use(`/docs`, (req: http.IncomingMessage, res) => {
        const result = docs[req.url || ""];
        if (result) {
          res.writeHead(200, {
            "content-type": "text/html;charset=utf8",
          });

          res.end(result);
        } else {
          res.writeHead(404);
          res.end(JSON.stringify(Object.keys(docs)));
        }
      });

      watcher
        .on("add", (path) => console.log(`File ${path} has been added`))
        .on("change", (path) => console.log(`File ${path} has been changed`))
        .on("unlink", (path) => console.log(`File ${path} has been removed`));
    },
  };
}

export default vueDocs;
