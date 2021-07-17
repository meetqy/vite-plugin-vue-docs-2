<template>
  <div>
    <router-link to="/setup">setup</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App1",
});
</script>

<style></style>
