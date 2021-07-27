import { Config } from "./index";
import { getBaseUrl, toLine, toPascalCase } from "./utils";
import { RenderData } from "./type";
import { ViteDevServer } from "vite";
import { hmrServer } from "./hmr";

export interface Route {
  name: string;
  path: string;
  file: string;
  data?: RenderData | null;
  demo?: Demo | null;
}

export interface Demo {
  file: string;
  name: string;
  code?: string;
}

class DocsRoute {
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

  add(file: string, data?: RenderData, demo?: Demo | null): void {
    const routePath = this.getRoutePathByFile(file);
    const routeName = this.getRouteNameByFile(file) || "";
    if (routePath) {
      this.route[routePath] = {
        path: routePath,
        name: routeName,
        file,
        data,
        demo,
      };

      this.server?.ws && hmrServer.add(this.route[routePath], this);
    }
  }

  change(file: string, data?: RenderData, demo?: Demo | null): void {
    const routeName = this.getRoutePathByFile(file) || "";
    const item = this.route[routeName];
    if (item && (data || demo)) {
      data && (item.data = data);
      demo && (item.demo = demo);

      this.server?.ws && hmrServer.update(this.server.ws, item);
    }
  }

  toArray(): Route[] {
    const arr = [];
    for (const key in this.route) {
      arr.push(this.route[key]);
    }

    return arr;
  }

  remove(file: string): void {
    const routeName = this.getRoutePathByFile(file);
    if (routeName) {
      this.server?.ws &&
        hmrServer.remove(this.server.ws, this.route[routeName], this.toArray());
      delete this.route[routeName];
    }
  }
}

export function Route(config?: Config): DocsRoute {
  return DocsRoute.instance(config);
}

export default DocsRoute;
