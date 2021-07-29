// @ts-nocheck

import { defineComponent, exportDefault } from "./utils";

export const normal1 = defineComponent(`emits: [
    // 这是事件注释
    click
],
props: {
  // 这是props注释
  name: [string, number]
}
`);

export const default1 = exportDefault(`emits: [
    // 这是事件注释
    click
],
props: {
  // 这是props注释
  name: [string, number]
}`);
