<template>
  <div class="van-doc">
    <custom-header></custom-header>
    <custom-nav :navs="content.nav"></custom-nav>
    <div class="van-doc-container van-doc-row">
      <div class="van-doc-content van-doc-content--common">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CustomNav from "./nav.vue";
import CustomHeader from "./header.vue";
export default {
  components: { CustomNav, CustomHeader },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nav: [],
    };
  },
};
</script>

<style>
@import "./style.css";
</style>
