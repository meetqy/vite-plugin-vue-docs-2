<template>
  <div>
    <p>
      <el-button type="danger" @click="$router.push('/docs')">
        查看文档
      </el-button>
    </p>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ElButton from "./components/element/button.vue";

export default defineComponent({
  name: "App",
  components: { ElButton },
});
</script>

<style></style>
