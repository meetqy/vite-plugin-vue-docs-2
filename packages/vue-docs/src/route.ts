import { Config, vueToJsonData } from "./index";
import { debug, getBaseUrl, toLine, toPascalCase } from "./utils";
import { RenderData } from "./type";
import { ViteDevServer } from "vite";
import * as fs from "fs";
import Cache from "./cache";

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
  code: string;
}

export interface NavRoute {
  title: string;
  data: NavRouteData[];
}

export interface NavRouteData {
  path: string;
  name: string;
}

class DocsRoute {
  // key: routePath
  route: { [key: string]: Route };
  config: Config;
  baseRoute: string;
  server: ViteDevServer | null | undefined;
  private static _instance: DocsRoute;

  private constructor(config: Config) {
    this.config = config;
    this.baseRoute = getBaseUrl(this.config);
    this.route = {};
    if (config.showUse) {
      this.route = {
        "@vite-plugin-vue-docs/readme": {
          path: "/",
          name: "VueDocsReadme-使用说明",
          file: config.templateDir + "/Readme.vue",
          component: `() => import('${config.templateDir}/Readme.vue')`,
        },
        "@vite-plugin-vue-docs/changelog": {
          path: "/@vite-plugin-vue-docs/changelog",
          name: "VueDocsChangeLog-更新日志",
          file: config.templateDir + "/ChangeLog.vue",
          component: `() => import('${config.templateDir}/ChangeLog.vue')`,
        },
      };
    }
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

  getRoutePathByFile(file: string): string | null {
    let newFile = file;
    if (file.includes("demo")) {
      newFile = file.replace(".demo.vue", ".vue");
    }

    if (this.config.fileExp.test(newFile)) {
      const path = newFile.replace(this.config.root, "").replace(".vue", "");
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

  getRouteDemo(route: Route, demoFile: string): Demo {
    return {
      file: demoFile,
      name: route.name + "Demo",
      code: fs.readFileSync(demoFile, "utf-8"),
    };
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

    if (fs.existsSync(demoFile)) {
      route.demo = this.getRouteDemo(route, demoFile);
      debug.route("add demo %O", route.demo);
    }

    const cacheDir = Cache.childFile(this.config, route);

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

  change(file: string): void {
    const routePath = this.getRoutePathByFile(file);
    if (!routePath || !this.route[routePath]) return;
    const route = this.route[routePath];

    if (file.includes(".demo.vue")) {
      route.demo = this.getRouteDemo(route, file);
    } else {
      const result = vueToJsonData(fs.readFileSync(file, "utf-8"));
      debug.route("change %O", this.route[routePath]);
      this.route[routePath].data = result?.content;
    }

    Cache.childFile(this.config, this.route[routePath]);
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
    const demoImports = [];
    const demoComponent = [];
    for (const key in this.route) {
      const route = this.route[key];
      const json = {
        path: route.path.replace(/\//, ""),
        name: route.name,
        component: route.component,
        props: {
          content: route.data,
        },
      };

      if (route.demo) {
        const demoName = route.demo.name;
        demoImports.push(`import ${demoName} from "${route.demo.file}"`);
        demoComponent.push(`Vue.component('${demoName}', ${demoName})`);
      }

      arr.push(
        JSON.stringify(json).replace(/"\(\) => .*?\)"/, function (str) {
          return str.replace(/"/g, "");
        })
      );
    }

    const layout = `[{
      path: '/docs',
      component: () => import('${this.config.cacheDir}/layout.vue'),
      children: [${arr.join(",\n").replace(/\s+/g, "")}]
    }]`;

    Cache.createLayout(this.config, this);

    debug.route("demo imports %O", demoImports);
    debug.route("demo component %O", demoComponent);

    let code = `export const routes = ${layout.replace(/\s+|\n+/g, "")};\n`;
    code += `${
      demoImports.length <= 1
        ? demoImports.join(";") + ";\n"
        : demoImports.join(";\n") + ";\n"
    }`;

    debug.route("demo import code %s", code);

    code += `export function initVueDocsDemo(Vue) {${
      demoComponent.length <= 1
        ? demoComponent.join(",") + "\n"
        : demoComponent.join(";\n")
    }};`.replace(/\n+/g, "");
    code += `export default routes;`;

    return code;
  }

  toNavRouteData(): NavRoute[] {
    const navs: NavRoute[] = [];

    const config = this.config;
    const routes = this.toArray();

    const componentRoute: NavRouteData[] = [];
    const defaultRoute: NavRouteData[] = [];

    routes.map((item) => {
      if (item.name.includes("VueDocs")) {
        defaultRoute.push({
          name: item.name.split("-")[1],
          path: config.base + item.path,
        });
      } else {
        componentRoute.push({
          name: item.name,
          path: config.base + item.path,
        });
      }
    });

    if (defaultRoute && defaultRoute.length > 0) {
      navs.push({
        title: "使用指南",
        data: defaultRoute,
      });
    }

    navs.push({
      title: "组件",
      data: componentRoute,
    });

    debug.route(
      "生成导航 %O",
      routes.map((item) => {
        return {
          name: item.name,
          path: config.base + item.path,
        };
      })
    );
    return navs;
  }

  clean(): void {
    this.route = {};
    Cache.clean(this.config);
  }
}

export default DocsRoute;
