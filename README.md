# vite-plugin-vue-docs

<p class="card-version">
  <a
    href="https://www.npmjs.com/package/vite-plugin-vue-docs"
    target="_blank"
    ><img
      src="https://img.shields.io/npm/v/vite-plugin-vue-docs"
      alt="npm version"
  /></a>
  <a href="javascript:"
    ><img
      src="https://img.shields.io/npm/l/vite-plugin-vue-docs"
      alt="license"
  /></a>
  <a href="javascript:"
    ><img
      src="https://img.shields.io/badge/statements-79.66%25-red.svg"
      alt="Statements"
  /></a>
  <a
    href="https://meetqy.github.io/vite-plugin-vue-docs/#/docs"
    target="_blank"
    ><img
      src="https://github.com/meetqy/vite-plugin-vue-docs/actions/workflows/deploy.yml/badge.svg"
      alt="example deploy"
  /></a>
</p>

## 介绍

vite 插件 - 自动生成 vue 组件文档网站。 <a href='https://meetqy.github.io/vite-plugin-vue-docs/#/docs' traget='_blank'>在线体验</a>

[English](./README.en.md) | **中文**

![preview](./preview.jpg)

## 特点

- 支持热更新
- 快速启动，依赖于 vite，无需另起服务
- 自动生成组件导航
- `Demo`在线查看
- ui 采用了<a href='https://youzan.github.io/vant-weapp/#/home'>`vant-ui`</a>的样式
- 核心方法覆盖率达到了 92.86%

## 运行 example

```shell
git clone https://github.com/meetqy/vite-plugin-vue-docs.git
yarn
yarn setup
yarn dev
```

## 使用

```shell
yarn add vite-plugin-vue-docs -D
```

### 配置 **vite-config.js**

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDocs from "vite-plugin-vue-docs";

export default defineConfig({
  plugins: [vue(), vueDocs()],
  resolve: {
    alias: {
      // 必须添加这一行，否则无法使用
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
});
```

### 修改 **main.{ts|js}** 文件

```js
import { createRouter } from "vue-router";
// 引入虚拟package
import { routes, initVueDocsDemo } from "virtual:vite-plugin-vue-docs";

const router = createRouter({
  // ...
  routes,
});

// 导入demo组件
app.use(initVueDocsDemo);
```

### 引入类型文件

```js
// vite-env.d.ts
/// <reference types="vite-plugin-vue-docs/client" />
```

详细使用方法可参考 [@vue-docs/example](./packages/example/README.md)

## 配置

| 参数         | 说明                 | 默认值        |
| ------------ | -------------------- | ------------- |
| base         | 文档路由地址         | `/docs`       |
| componentDir | 组件路径 相对于 src  | `/components` |
| vueRoute     | router 实例名称      | `router`      |
| showUse      | 静态网站显示使用指南 | `true`        |
| header       | 头部配置             | -             |

## Header

| 参数  | 说明             |
| ----- | ---------------- |
| title | 网站 header 标题 |

## 计划

- 🚀 表示已经实现的功能
- 👷 表示进行中的功能
- ⏳ 表示规划中的功能

| 功能                                         | 状态      |
| -------------------------------------------- | --------- |
| 可配置文档网站                               | ⏳ 规划中 |
| 兼容`<script setup>`                         | ⏳ 规划中 |
| 兼容`composition api`                        | ⏳ 规划中 |
| 可查看源代码                                 | 👷 进行中 |
| 打包成静态网页                               | 🚀 已完成 |
| 页面跳转 history 模式 &#124;&#124; hash 模式 | 🚀 已完成 |
| 在线查看实例                                 | 🚀 已完成 |
| 修改文件直接热更新，无须 F5 刷新             | 🚀 已完成 |
| 支持解析`slot`                               | 🚀 已完成 |
| 支持解析`ref`                                | 🚀 已完成 |
| 支持`type`多种类型                           | 🚀 已完成 |
| 自动生成路由                                 | 🚀 已完成 |

## CHANGELOG

<a href='https://meetqy.github.io/vite-plugin-vue-docs/#/docs/@vite-plugin-vue-docs/changelog' target="_blank">更新日志</a>
