import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDocs from "vite-plugin-vue-docs";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || "/vite-plugin-vue-docs/",
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
  plugins: [vue(), vueDocs()],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("highlight.js")) {
            if (id.includes("languages")) {
              return `hljs-languages-${
                id.split("languages/")[1].split(".js")[0]
              }`;
            } else {
              return "hljs";
            }
          }
        },
      },
    },
  },
});
