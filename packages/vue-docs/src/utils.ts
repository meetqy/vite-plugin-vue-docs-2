import humps from "humps";

export function toLine(str: string): string {
  return humps
    .decamelize(str, {
      separator: "-",
    })
    .replace(/^\/-/, "/");
}
