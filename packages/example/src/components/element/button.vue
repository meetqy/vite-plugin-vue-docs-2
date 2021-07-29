<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <!-- 按钮内容 -->
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "ElButton",
  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },
  props: {
    // 类型
    type: {
      type: String,
      default: "default",
    },
    // 尺寸
    size: String,
    // 图标类名
    icon: {
      type: String,
      default: "",
    },
    // 原生 type 属性
    nativeType: {
      type: String,
      default: "button",
    },
    // 是否加载中状态
    loading: Boolean,
    // 是否禁用状态
    disabled: Boolean,
    // 是否朴素按钮
    plain: Boolean,
    // 是否默认聚焦
    autofocus: Boolean,
    // 是否圆角按钮
    round: Boolean,
    // 是否圆形按钮
    circle: Boolean,
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>
