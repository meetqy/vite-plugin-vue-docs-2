# vite-plugin-vue-docs

[![npm version](https://badgen.net/npm/v/vite-plugin-vue-docs)](https://www.npmjs.com/package/vite-plugin-vue-docs)
[![license](https://badgen.net/npm/license/vite-plugin-vue-docs)](https://github.com/hannoeru/vite-plugin-vue-docs/blob/main/LICENSE)

自动生成vue组件文档

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
```

## 特点

* 支持热更新
* 快速启动，直接在vite上创建的路由，不用单独开端口

## changlog

[版本日志](./CHANGELOG.md)