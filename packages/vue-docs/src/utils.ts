import humps from "humps";

export function toLine(str: string): string {
  return humps
    .decamelize(str, {
      separator: "-",
    })
    .replace(/^\/-/, "/");
}

export function toPascalCase(str: string): string {
  return humps.pascalize(str);
}
