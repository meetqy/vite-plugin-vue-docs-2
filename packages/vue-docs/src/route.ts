import { Config, vueToJsonData } from "./index";
import { getBaseUrl, toLine, toPascalCase } from "./utils";
import { RenderData } from "./type";
import { ViteDevServer } from "vite";
import * as fs from "fs";
import path from "path";

// 子组件
export interface Route {
  name: string;
  path: string;
  file: string;
  component: string;
  data?: RenderData | null;
  demo?: Demo | null;
}

export interface Demo {
  file: string;
  name: string;
  code?: string;
}

class DocsRoute {
  // key: routePath
  route: { [key: string]: Route };
  config: Config;
  baseRoute: string;
  server: ViteDevServer | null | undefined;
  private static _instance: DocsRoute;

  private constructor(config: Config) {
    this.route = {};
    this.config = config;
    this.baseRoute = getBaseUrl(this.config);
  }

  static instance(config?: Config): DocsRoute {
    if (!this._instance && config) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  initWs(server: ViteDevServer): void {
    this.server = server;
  }

  // 验证文件路径是否符合要求
  // 返回正确的routeName
  getRoutePathByFile(file: string): string | null {
    if (this.config.fileExp.test(file)) {
      const path = file.replace(this.config.root, "").replace(".vue", "");
      return toLine(path);
    }

    return null;
  }

  getRouteNameByFile(file: string): string | null {
    const routePath = this.getRoutePathByFile(file);
    if (routePath) {
      return toPascalCase(routePath.replace(/\//g, "_"));
    }

    return null;
  }

  getRouteByFile(file: string): Route | null {
    const routePath = this.getRoutePathByFile(file);
    if (routePath) return this.route[routePath];
    return null;
  }

  handleCacheFile(route: Route): string {
    const cacheDir = path.join(this.config.cacheDir, route.name + ".vue");
    const tmpContent = fs.readFileSync(
      path.join(__dirname, "./template/content.vue"),
      "utf-8"
    );
    const cacheData = tmpContent.replace(
      `// @vite-plugin-vue-docs content`,
      `result: ${JSON.stringify(route.data)}`
    );

    fs.writeFileSync(cacheDir, cacheData);
    return cacheDir;
  }

  add(file: string): { [key: string]: Route } {
    const routePath = this.getRoutePathByFile(file);
    if (!routePath) return this.route;

    const routeName = this.getRouteNameByFile(file) || "";
    const demoFile = file.replace(".vue", ".demo.vue");

    const result = vueToJsonData(fs.readFileSync(file, "utf-8"));

    const route: Route = {
      path: routePath,
      name: routeName,
      file,
      component: "",
      data: result?.content,
    };

    const cacheDir = this.handleCacheFile(route);

    route.component = `() => import('${cacheDir}')`;

    if (fs.existsSync(demoFile)) {
      route.demo = {
        file: demoFile,
        name: toPascalCase(routeName + "-demo"),
        code: fs.readFileSync(demoFile, "utf-8"),
      };
    }

    this.route[routePath] = route;

    return this.route;
  }

  change(file: string) {
    const routePath = this.getRoutePathByFile(file);
    if (!routePath) return null;
    const result = vueToJsonData(fs.readFileSync(file, "utf-8"));
    this.route[routePath].data = result?.content;
    this.handleCacheFile(this.route[routePath]);
  }

  toArray(): Route[] {
    const arr = [];
    for (const key in this.route) {
      arr.push(this.route[key]);
    }

    return arr;
  }

  toClientCode(): string {
    const arr = [];
    for (const key in this.route) {
      const route = this.route[key];
      const json = {
        path: route.path,
        name: route.name,
        component: route.component,
        props: {
          content: route.data,
        },
      };
      arr.push(
        JSON.stringify(json).replace(/"\(\) => .*?\)"/, function (str) {
          return str.replace(/"/g, "");
        })
      );
    }

    return `const routes = [${arr.join(",")}];export default routes`;
  }

  remove(file: string): void {
    const routeName = this.getRoutePathByFile(file);
    if (routeName) {
      this.server?.ws && delete this.route[routeName];
    }
  }
}

export function Route(config?: Config): DocsRoute {
  return DocsRoute.instance(config);
}

export default DocsRoute;
