<template>
  <div>
    <button class="el-button" :class="`el-button--${type}`">
      <!-- 文本内容 -->
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  // 尺寸
  size: {
    type: String,
    default: "medium",
  },
  // 类型
  type: {
    type: String,
    default: "default",
  },
});
</script>
<style>
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.el-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.el-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
