<template>
  <div>
    <el-tag
      style="margin-right: 10px"
      v-for="(item, i) in types"
      :key="i"
      :type="item.type"
    >
      标签{{ i + 1 }}
    </el-tag>
  </div>
  <div style="margin-top: 20px">
    <el-tag
      style="margin-right: 10px"
      v-for="tag in types"
      :key="tag.name"
      closable
      :type="tag.type"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
import ElTag from "./tag.vue";
export default {
  name: "tag.demo",
  components: { ElTag },
  data() {
    return {
      types: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" },
      ],
    };
  },
};
</script>

<style scoped></style>
