import { Config } from "./index";
import { getBaseUrl, toLine } from "./utils";
import { RenderData } from "./type";

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

  // 验证文件路径是否符合要求
  // 返回正确的routeName
  getRouteNameByFile(file: string): string | null {
    if (this.config.fileExp.test(file)) {
      const path = file.replace(this.config.root, "").replace(".vue", "");
      return toLine(path);
    }

    return null;
  }

  add(file: string, data?: RenderData, demo?: Demo | null): void {
    const routeName = this.getRouteNameByFile(file);
    if (routeName) {
      const name = routeName.split("/");
      this.route[routeName] = {
        path: this.config.base + routeName,
        name: name[name.length - 1],
        file,
        data,
        demo,
      };
    }
  }

  change(file: string, data?: RenderData, demo?: Demo | null): void {
    const routeName = this.getRouteNameByFile(file) || "";
    const item = this.route[routeName];
    if (item) {
      data && (item.data = data);
      demo && (item.demo = demo);
    }
  }

  get(routeName?: string): { [key: string]: Route } | Route {
    if (routeName) return this.route[routeName];
    return this.route;
  }

  toArray(): Route[] {
    const arr = [];
    for (const key in this.route) {
      arr.push(this.route[key]);
    }

    return arr;
  }

  remove(file: string): void {
    const routeName = this.getRouteNameByFile(file);
    if (routeName) {
      delete this.route[routeName];
    }
  }
}

export function Route(config?: Config): DocsRoute {
  return DocsRoute.instance(config);
}

export default DocsRoute;
