var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import glob from "glob";
import fs from "fs";
import humps from "humps";
import { transformMain } from "./main";
function vueDocs() {
    return {
        name: "vite-plugin-vue-docs",
        configureServer(server) {
            return __awaiter(this, void 0, void 0, function* () {
                const { watcher, middlewares } = server;
                const root = `${process.cwd()}/src/components`;
                let docs = {};
                glob(`${root}/**/*.vue`, {}, (err, files) => {
                    if (err)
                        throw err;
                    files.map((file) => {
                        const path = file.replace(root, "").replace(".vue", "");
                        docs[humps.decamelize(path, { separator: "-" })] = transformMain(fs.readFileSync(file, "utf-8"));
                    });
                });
                // 构建路由
                middlewares.use(`/docs`, (req, res) => {
                    const result = docs[req.url || ""];
                    if (result) {
                        res.writeHead(200, {
                            "content-type": "text/html;charset=utf8",
                        });
                        res.end(result);
                    }
                    else {
                        res.writeHead(404);
                        res.end(JSON.stringify(Object.keys(docs)));
                    }
                });
                watcher
                    .on("add", (path) => console.log(`File ${path} has been added`))
                    .on("change", (path) => console.log(`File ${path} has been changed`))
                    .on("unlink", (path) => console.log(`File ${path} has been removed`));
            });
        },
    };
}
export default vueDocs;
//# sourceMappingURL=index.js.map