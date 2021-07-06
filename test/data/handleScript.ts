// @ts-nocheck

function defineComponent(content) {
  return `<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  ${content}
})
</script>`;
}

function exportDefault(content) {
  return `<script lang="ts">
export default {
  name: 'HelloWorld',
  ${content}
}
</script>`;
}

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

export const emits1 = defineComponent(`emits: [
    click
]`);

export const emits2 = defineComponent(`emits: [
    // 这是事件注释
    click
]`);

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
