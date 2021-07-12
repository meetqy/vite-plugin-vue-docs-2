<template>
  <div>这是一个Rote评分组价测试</div>
</template>
<script lang="ts">
export default {
  name: "Rote",
  props: {
    // 在表单内提交时的标识符
    name: String,
    // 当前分值
    value: Number,
    // 图标总数
    count: {
      type: Number,
      default: 5,
    },
    // 图标大小，默认单位为 px
    size: {
      type: [String, Number],
      default: "20px",
    },
  },
  emits: [
    // 当前分值变化时触发的事件
    "change",
  ],
};
</script>
