# vite-plugin-vue-docs

自动生成组件文档

## 使用

``` shell
yarn add vite-plugin-vue-docs -D
```

``` js
// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDocs from "vite-plugin-vue-docs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDocs()],
});

```