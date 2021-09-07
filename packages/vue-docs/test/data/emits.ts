// @ts-nocheck

import { defineComponent } from "./utils";

export const emits1 = defineComponent(`emits: [
    click
]`);

export const emits2 = defineComponent(`emits: [
    // 这是事件注释
    click
]`);

export const emits3 = defineComponent(`emits: {
    // 没有验证函数
    click: null,

    // 带有验证函数
    submit: payload => {
      if (payload.email && payload.password) {
        return true
      } else {
        console.warn(\`Invalid submit event payload!\`)
        return false
      }
    }
}`);
