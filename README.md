# vite-plugin-vue-docs

自动生成组件文档

![](./preview.png)

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

## example

```shell
git clone https://github.com/meetqy/vite-plugin-vue-docs.git
yarn 
yarn dev
yarn example:dev

// 访问 `docs/-hello-world`
```

## 特点

* 支持热更新
* 快速启动，直接在vite上创建的路由，不用单独开端口

## 计划

* [ ] 自动生成导航栏
* [ ] 初始化可自定义配置