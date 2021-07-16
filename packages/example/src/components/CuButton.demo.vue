<template>
  <div style="display: flex">
    <cu-button style="margin-right: 20px">默认按钮</cu-button>
    <cu-button type="primary">主要按钮</cu-button>
  </div>
</template>
<script>
import CuButton from "./CuButton.vue";
export default {
  name: "CuButtonDemo",
  components: { CuButton },
};
</script>
