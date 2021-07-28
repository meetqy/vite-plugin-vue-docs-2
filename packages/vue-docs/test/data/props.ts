// @ts-nocheck

import { defineComponent } from "./utils";

export const props1 = defineComponent(`props: {
    // 测试获取组件名称
    name: String,
 }`);

export const props2 = defineComponent(`props: {
    // 测试获取组件名称
    name: {
        type: String,
        default: '组件名称'
    }
}`);

export const props3 = defineComponent(`props: {
    // 测试获取组件名称
    name: {
        type: String,
        default: '组件名称',
        required: true,
    }
}`);

export const props4 = defineComponent(`props: {
    name: {
        type: String,
        default: '组件名称',
        required: true,
    }
}`);

export const props5 = defineComponent(`props: {
    name: {
        type: [String, Number],
        default: '组件名称',
        required: true,
    }
}`);
