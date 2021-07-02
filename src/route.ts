import humps from "humps";
import { transformMain } from "./main";
import fs from "fs";
import { Config } from "./index";

class DocsRoute {
  readonly route: { [key: string]: string };
  config: Config;

  constructor(config: Config) {
    this.route = {};
    this.config = config;
  }

  // 验证文件路径是否符合要求
  // 返回正确的routeName
  getRouteNameToFile(file: string): string | null {
    if (this.config.fileExp.test(file)) {
      const path = file.replace(this.config.root, "").replace(".vue", "");
      return humps.decamelize(path, {
        separator: "-",
      });
    }

    return null;
  }

  add(file: string) {
    const routeName = this.getRouteNameToFile(file);
    if (routeName) {
      this.route[routeName] =
        transformMain(fs.readFileSync(file, "utf-8")) || "";
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

export default DocsRoute;
