<template>
  <div class="van-doc-nav" style="top: 64px; bottom: 0px">
    <div class="van-doc-nav__group">
      <div class="van-doc-nav__title">项目名称</div>
      <div class="van-doc-nav__item" v-for="item in navs" :key="item.path">
        <router-link
          :class="{ active: item.path === $route.path }"
          :to="item.path"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomNav",
  props: {
    navs: Array,
  },
  watch: {
    $route(val) {
      localStorage.setItem("vue-docs-reload-path", val.path);
    },
  },
};
</script>

<style></style>
