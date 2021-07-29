<template>
  <div>
    <el-button v-for="(item, i) in types" :key="item" :type="item">
      {{ item }}
    </el-button>
  </div>
</template>

<script>
import ElButton from "./button.vue";
export default {
  components: { ElButton },
  name: "button.demo.vue",
  data() {
    return {
      types: ["default", "primary", "success", "info", "warning", "danger"],
    };
  },
};
</script>
