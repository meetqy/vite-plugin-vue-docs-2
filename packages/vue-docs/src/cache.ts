import { Config } from "./index";
import fs from "fs-extra";
import DocsRoute, { Route } from "./route";
import path from "path";
import { debug } from "./utils";

function createDir(config: Config): void {
  fs.ensureDirSync(config.cacheDir);
}

function createLayout(config: Config, route: DocsRoute): void {
  const layoutDir = path.join(__dirname, "./template/layout.vue");
  const oldDir = config.cacheDir + "/layout.vue";

  let oldData = "";
  if (fs.existsSync(oldDir)) {
    oldData = fs.readFileSync(oldDir, "utf-8");
  }

  const navs = route.toNavRouteData();
  // 不使用模板引擎，直接使用标志的方式替换掉
  const layout = fs
    .readFileSync(`${layoutDir}`, "utf-8")
    .replace(
      "// @vite-plugin-vue-docs layout header",
      `header: ${JSON.stringify(config.header)},`
    )
    .replace(
      "// @vite-plugin-vue-docs layout nav",
      `navs: ${JSON.stringify(navs)},`
    );

  if (oldData === layout) return;

  fs.writeFileSync(oldDir, layout);
}

function clean(config: Config): void {
  fs.emptyDirSync(config.cacheDir);
}

function childFile(config: Config, route: Route): string {
  const cacheDir = path.join(config.cacheDir, route.name + ".vue");
  debug.cache("childFile %s", cacheDir);

  const tmpContent = fs.readFileSync(
    path.join(__dirname, "./template/content.vue"),
    "utf-8"
  );

  let oldContent = "";
  if (fs.existsSync(cacheDir)) {
    oldContent = fs.readFileSync(cacheDir, "utf-8");
  }

  let cacheData = tmpContent.replace(
    `// @vite-plugin-vue-docs content result`,
    `result: ${JSON.stringify(route.data)}`
  );

  if (route.demo) {
    const demo = route.demo;
    const demoCode = demo.code
      ?.replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/{/g, "&#123;")
      .replace(/}/g, "&#125");
    cacheData = cacheData.replace(
      `<!-- @vite-plugin-vue-docs content template demo -->`,
      `<div class="card">
      <h3>Demo</h3>
      <${demo.name} />
      <pre v-highlightjs v-show="showSourceCode"><code class="language-js">${demoCode}</code></pre>
      <div class="source-code">
        <p style="text-align: center">
            <span style="cursor: pointer" @click="showSourceCode=!showSourceCode">
                {{showSourceCode ? '收起' : '展开'}}代码
            </span>
        </p>
      </div>
   </div>`
    );
  }

  if (oldContent === cacheData) return cacheDir;

  fs.writeFileSync(cacheDir, cacheData);
  return cacheDir;
}

const Cache = {
  clean,
  childFile,
  createDir,
  createLayout,
};

export default Cache;
