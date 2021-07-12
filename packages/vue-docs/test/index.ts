// @ts-nocheck

import { parse } from "@vue/compiler-sfc";
import { handleScript } from "../src/main";
import fs from "fs";
import cheerio from "cheerio";
import { getSlotsByTemplate } from "../src/handle";

// const $ = cheerio.load(`<h1 @click="handleClick">{{ name }}</h1>
//   <h2>{{ version }}</h2>
//   <h2>{{ normal }}</h2>
//   <header>
//     <!-- 这是一个header插槽 -->
//     <slot></slot>
//   </header>
//   <h2>{{ letter }}</h2>
//   <h2>{{ moreType }}</h2>
//   <slot name="header" :show="false"></slot>`);
//
// const $contents = $("*").contents();
//
// let arr = [];
//
// $contents.map(function (index, element) {
//   if (element?.name === "slot") {
//     console.log(element);
//     arr.push({
//       slot: element,
//       comment: $contents[index - 2],
//     });
//   }
// });
//
// console.log(arr);

const code = fs.readFileSync(
  "../example/src/components/HelloWorld.vue",
  "utf-8"
);

const { descriptor, errors } = parse(code);
if (descriptor.template) {
  const res = getSlotsByTemplate(descriptor.template);
  console.log(res);
}
