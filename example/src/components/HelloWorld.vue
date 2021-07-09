<template>
  <h1 @click="handleClick">{{ name }}</h1>
  <h2>{{ version }}</h2>
  <h2>{{ normal }}</h2>
  <header>
    <!-- 这是一个header插槽 -->
    <slot></slot>
  </header>
  <h2>{{ letter }}</h2>
  <h2>{{ moreType }}</h2>
  <slot name="header" :show="false"></slot>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',

  props: {
    // 测试获取组件名称
    name: String,
    // 正常测试
    normal: {
      type: String,
      required: true,
      default: '正常测试'
    },
    // 少某一个配置
    letter: {
      type: String,
      default: '少某一个配置'
    },
    // 版本号
    version: String,
    // 多种类型
    moreType: [String, Number],
  },

  emits: [
    // 点击事件
    'click',
    // 数据改变
    "change"
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
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    },

    /**
     * @vue-docs-ref
     * @description 显示
     */
    show() {

    },

    handleClick() {
      alert('click')
    }
  },
})
</script>
