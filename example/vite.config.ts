import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDocs from "vite-plugin-vue-docs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9000,
  },
  plugins: [
    vue(),
    vueDocs({
      base: "/docs/",
    }),
  ],
});
