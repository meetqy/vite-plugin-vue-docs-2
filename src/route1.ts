import { Component, transformMain } from "./main";
import fs from "fs";
import { Config } from "./index";
import { toLine } from "./utils";

interface Router {
  html: string;
  component: Component;
  routeName: string;
}

class DocsRoute {
  route: { [key: string]: Router };
  config: Config;
  private static _instance: DocsRoute;

  private constructor(config: Config) {
    this.route = {};
    this.config = config;
  }

  static instance(config?: Config) {
    if (!this._instance && config) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  // 验证文件路径是否符合要求
  // 返回正确的routeName
  getRouteNameToFile(file: string): string | null {
    if (this.config.fileExp.test(file)) {
      const path = file.replace(this.config.root, "").replace(".vue", "");
      return toLine(path);
    }

    return null;
  }

  add(file: string) {
    const routeName = this.getRouteNameToFile(file);
    if (routeName) {
      const result = transformMain(fs.readFileSync(file, "utf-8"));

      if (result) {
        this.route[routeName] = {
          ...result,
          routeName,
        };
      }
    }
  }

  change(file: string) {
    this.add(file);
  }

  get(routeName?: string) {
    if (routeName) return this.route[routeName];
    return this.route;
  }

  remove(file: string) {
    const routeName = this.getRouteNameToFile(file);
    if (routeName) {
      delete this.route[routeName];
    }
  }
}

export function Route(config?: Config): DocsRoute {
  return DocsRoute.instance(config);
}

export default DocsRoute;
