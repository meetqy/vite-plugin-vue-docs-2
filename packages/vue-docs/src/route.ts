import { Config } from "./index";
import { toLine } from "./utils";

export interface Route {
  name: string;
  path: string;
  file: string;
}

class DocsRoute {
  route: { [key: string]: string };
  config: Config;
  private static _instance: DocsRoute;

  private constructor(config: Config) {
    this.route = {};
    this.config = config;
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

  add(file: string): void {
    const routeName = this.getRouteNameByFile(file);
    if (routeName) {
      this.route[routeName] = file;
    }
  }

  change(file: string): void {
    this.add(file);
  }

  get(routeName?: string): { [key: string]: string } | string {
    if (routeName) return this.route[routeName];
    return this.route;
  }

  toArray(): Route[] {
    const routes = Object.keys(this.route);
    const arr: Route[] = [];

    routes.map((key) => {
      const name = key.split("/");
      arr.push({
        path: this.config.base + key,
        name: name[name.length - 1],
        file: this.route[key],
      });
    });

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
