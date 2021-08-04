<template>
  <div>
    <div>
      <el-button v-for="item in types" :key="item.value" :type="item.value">
        {{ item.name }}
      </el-button>
    </div>
    <div style="margin-top: 10px">
      <el-button
        plain
        v-for="item in types"
        :type="item.value"
        :key="item.value"
      >
        {{ item.name }}
      </el-button>
    </div>
    <div style="margin-top: 10px">
      <el-button
        round
        v-for="item in types"
        :key="item.value"
        :type="item.value"
      >
        {{ item.name }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import ElButton from "./button.vue";
import { typesArray } from "../constants";
export default {
  components: { ElButton },
  name: "button.demo.vue",
  data() {
    return {
      types: typesArray,
    };
  },
};
</script>
