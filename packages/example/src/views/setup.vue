<template>
  <div>
    <cu-button-setup @send="send">default</cu-button-setup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CuButtonSetup from "../components/CuButtonSetup.vue";
export default defineComponent({
  name: "setup",
  components: { CuButtonSetup },
  setup() {
    const send = (e: string) => console.log(e);

    return {
      send,
    };
  },
});
</script>
