<template>
  <div class="van-doc-nav" style="top: 64px; bottom: 0">
    <div class="van-doc-nav__group" v-for="(nav, index) in navs" :key="index">
      <div class="van-doc-nav__title">{{ nav.title }}</div>
      <div class="van-doc-nav__item" v-for="item in nav.data" :key="item.path">
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
};
</script>
