<template>
  <span
    v-if="!disableTransitions"
    :class="classes"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <slot></slot>
    <i
      v-if="closable"
      class="el-tag__close el-icon-close"
      @click="handleClose"
    ></i>
  </span>
  <transition v-else name="el-zoom-in-center">
    <span
      :class="classes"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <slot></slot>
      <i
        v-if="closable"
        class="el-tag__close el-icon-close"
        @click="handleClose"
      ></i>
    </span>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useGlobalConfig } from "element-plus/packages/utils/util";
import { isValidComponentSize } from "element-plus/packages/utils/validators";
import type { PropType } from "vue";
export default defineComponent({
  name: "ElTag",
  props: {
    // 是否可关闭
    closable: Boolean,
    // 类型
    type: {
      type: String as PropType<"success" | "info" | "warning" | "danger" | "">,
      default: "",
    },
    // 是否有边框描边
    hit: Boolean,
    // 是否禁用渐变动画
    disableTransitions: Boolean,
    // 背景色
    color: {
      type: String,
      default: "",
    },
    // 尺寸
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    // 主题
    effect: {
      type: String,
      default: "light",
      validator: (val: string): boolean => {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      },
    },
  },
  emits: [
    // 关闭 Tag 时触发的事件
    "close",
    // 点击 Tag 时触发的事件
    "click",
  ],
  setup(props, ctx) {
    const ELEMENT = useGlobalConfig();
    const tagSize = computed(() => {
      return props.size || ELEMENT.size;
    });
    const classes = computed(() => {
      const { type, hit, effect } = props;
      return [
        "el-tag",
        type ? `el-tag--${type}` : "",
        tagSize.value ? `el-tag--${tagSize.value}` : "",
        effect ? `el-tag--${effect}` : "",
        hit && "is-hit",
      ];
    });
    // methods
    const handleClose = (event) => {
      event.stopPropagation();
      ctx.emit("close", event);
    };
    const handleClick = (event) => {
      ctx.emit("click", event);
    };
    return {
      tagSize,
      classes,
      handleClose,
      handleClick,
    };
  },
});
</script>
