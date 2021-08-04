<template>
  <div style="width: 350px">
    <el-progress :percentage="50"></el-progress>
    <el-progress :percentage="100" :format="format"></el-progress>
    <el-progress :percentage="100" status="success"></el-progress>
    <el-progress :percentage="100" status="warning"></el-progress>
    <el-progress :percentage="50" status="exception"></el-progress>
  </div>

  <div style="margin-top: 20px; width: 350px">
    <h3>百分比内显</h3>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="70"
    ></el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    ></el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    ></el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    ></el-progress>
  </div>

  <div style="width: 350px; margin-top: 20px">
    <h3>自定义内容</h3>
    <el-progress :percentage="50">
      <el-button type="text">自定义内容</el-button>
    </el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    >
      <span>自定义内容</span>
    </el-progress>
    <el-progress type="circle" :percentage="100" status="success">
      <el-button type="success" icon="el-icon-check" circle></el-button>
    </el-progress>
    <el-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">当前进度</span>
      </template>
    </el-progress>
  </div>

  <div style="width: 350px; margin-top: 20px">
    <h3>动态进度条</h3>
    <el-progress :percentage="50" :indeterminate="true"></el-progress>
    <el-progress
      :percentage="100"
      :format="format"
      :indeterminate="true"
    ></el-progress>
    <el-progress
      :percentage="100"
      status="success"
      :indeterminate="true"
      :duration="5"
    ></el-progress>
    <el-progress
      :percentage="100"
      status="warning"
      :indeterminate="true"
      :duration="1"
    ></el-progress>
    <el-progress
      :percentage="50"
      status="exception"
      :indeterminate="true"
    ></el-progress>
  </div>
</template>

<script>
import ElProgress from "./progress.vue";
export default {
  name: "skeleton.demo",
  components: { ElProgress },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
  },
};
</script>

<style scoped>
.el-progress {
  margin-top: 10px;
}
</style>
