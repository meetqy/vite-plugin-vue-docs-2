import { transformMain } from "../src/main";
import fs from "fs";

const code = fs.readFileSync(
  "../example/src/components/HelloWorld.vue",
  "utf-8"
);

transformMain(code);
