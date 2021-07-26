<template>
  <div class="van-doc">
    <custom-header :header="header"></custom-header>
    <custom-nav :navs="result"></custom-nav>
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
    routes: {
      type: Object,
      default: () => {},
    },
    header: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    result() {
      const route = this.$route;
      if (route.params && route.params.routes) {
        return JSON.parse(route.params.routes || {});
      }

      if (this.routes) return this.routes;

      return {};
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
