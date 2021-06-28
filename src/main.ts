import { parse } from "@vue/compiler-sfc";

export function transformMain(code: string) {
  const ast = parse(code);

  console.log(ast);
}
