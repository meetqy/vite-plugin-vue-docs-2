<template></template>

<script>
export default {
  name: "card-a",
  props: {
    // 这是一个name
    name: {
      type: Object,
      default: () => {},
    },
  },
  emits: [
    // click事件
    "click",

    // change事件
    "change",
  ],
};
</script>

<style scoped></style>
