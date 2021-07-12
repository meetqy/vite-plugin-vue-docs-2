import { defineComponent } from "./utils";

export const emits1 = defineComponent(`emits: [
    click
]`);

export const emits2 = defineComponent(`emits: [
    // 这是事件注释
    click
]`);
