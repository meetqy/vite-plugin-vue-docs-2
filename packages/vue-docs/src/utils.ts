import humps from "humps";

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
