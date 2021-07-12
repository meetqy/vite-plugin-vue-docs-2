<template>
  <header>
    <!-- 这是一个header插槽 -->
    <slot name="header"></slot>
  </header>
  <!-- 这是content插槽 -->
  <slot :show="false"></slot>
</template>
<script lang="ts">
export default {
  name: "Preview",
  props: {
    // 这是标题
    name: {
      type: String,
      required: true,
      default: "正常测试",
    },
    // 支持多种类型
    age: [Number, String],
  },
  emits: [
    // 点击事件
    "click",
    // 数据改变
    "change",
  ],
  methods: {
    /**
     * @vue-docs-ref
     * @description 这是一个描述
     * @param {string} p1 参数说明
     * @param {object} [options]   可选参数
     * @return $ {name: number, version: string}
     */
    emits(p1: string, options?: object) {
      return {
        name: "vue-docs",
        version: "v0.0.6",
      };
    },
  },
};
</script>
