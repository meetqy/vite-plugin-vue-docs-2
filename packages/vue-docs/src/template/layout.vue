<template>
  <div class="van-doc">
    <custom-header :header="header"></custom-header>
    <custom-nav :navs="result.nav"></custom-nav>
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
    header: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    result() {
      const route = this.$route;
      console.log(route);
      if (route.params && route.params.content) {
        return JSON.parse(route.params.content || {});
      }

      if (this.content) return this.content;

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
