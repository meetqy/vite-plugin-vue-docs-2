<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App1",
  components: {
    HelloWorld,
  },
});
</script>

<style></style>
