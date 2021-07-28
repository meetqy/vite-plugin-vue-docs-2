import humps from "humps";
import { Config } from "./index";
import Debug from "debug";

// 横杠写法 -
export function toLine(str: string): string {
  return humps
    .decamelize(str, {
      separator: "-",
    })
    .replace(/^\/-/, "/");
}

// 驼峰
export function toPascalCase(str: string): string {
  return humps.pascalize(str);
}

export function getBaseUrl(config: Config): string {
  const { base, viteConfig } = config;
  return viteConfig?.base ? viteConfig?.base.replace(/\/$/, "") + base : base;
}

export const debug = {
  route: Debug("vue-docs:route"),
  cache: Debug("vue-docs:cache"),
  hmr: Debug("vue-docs:hmr"),
};
