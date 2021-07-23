<template>
  <aside class="el-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: "ElAside",
  componentName: "ElAside",
  props: {
    // 你好671212321
    width: {
      type: String,
      default: "300px",
    },
  },
};
</script>
