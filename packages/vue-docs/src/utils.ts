import humps from "humps";
import { Config } from "./index";

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
