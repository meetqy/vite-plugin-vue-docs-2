import { RouteComponent } from "vue-router";

export const layout: RouteComponent = {
  data() {
    return { a: 123 };
  },
  template: `<template>
  <div class="van-doc">
    {{a}}
    <custom-header></custom-header>
    <custom-nav></custom-nav>
    <router-view></router-view>
  </div>
</template>`,
};
