<template>
  <div style="display: flex">
    <cu-button
      :type="item"
      style="margin-right: 20px"
      v-for="item in types"
      :key="item"
    >
      {{ item }}
    </cu-button>
  </div>
</template>
<script>
import CuButton from "./CuButton.vue";
export default {
  name: "CuButtonDemo",
  components: { CuButton },
  data() {
    return {
      types: ["default", "primary", "success", "warning", "danger"],
    };
  },
};
</script>
