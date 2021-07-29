declare module "virtual:vite-plugin-vue-docs" {
  import { RouteRecordRaw } from "vue-router";
  import { App } from "vue";
  export const routes: RouteRecordRaw[];
  type InitVueDocsDemo = (Vue: App) => void;
  export const initVueDocsDemo: InitVueDocsDemo;
  export default routes;
}
