<template>
  <div>
    <el-badge :value="12" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="1" class="item" type="primary">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="2" class="item" type="warning">
      <el-button size="small">回复</el-button>
    </el-badge>
  </div>

  <div style="margin-top: 20px">
    <h3>最大值</h3>
    <el-badge :value="200" :max="99" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="100" :max="10" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>
  </div>

  <div style="margin-top: 20px">
    <h3>自定义内容</h3>
    <el-badge value="new" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge value="hot" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>
  </div>
</template>

<script>
import ElButton from "./button.vue";
import ElBadge from "./badge.vue";
export default {
  name: "badge.demo",
  components: { ElButton, ElBadge },
};
</script>

<style scoped>
.el-badge {
  margin-right: 30px;
}
</style>
