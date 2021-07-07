import { parse } from "@vue/compiler-sfc";
import { handleScript } from "../src/main";
import fs from "fs";

const code = fs.readFileSync(
  "../example/src/components/HelloWorld.vue",
  "utf-8"
);

const { descriptor, errors } = parse(code);
if (descriptor.script) {
  const res = handleScript(descriptor.script);
  console.log(res);
}
