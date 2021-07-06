# vite-plugin-vue-docs

![npm version](https://img.shields.io/npm/v/vite-plugin-vue-docs)
![license](https://img.shields.io/npm/l/vite-plugin-vue-docs)
![jest coverage](./badges/badge-statements.svg)

vite插件 - 自动生成vue组件文档

![preview](./preview.png)

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
```

## 特点

* 支持热更新
* 快速启动，依赖于vite，无需另起服务
* 自动生成组件导航

## changlog

[版本日志](./CHANGELOG.md)