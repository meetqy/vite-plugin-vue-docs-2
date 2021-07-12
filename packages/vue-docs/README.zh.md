# vite-plugin-vue-docs

![npm version](https://img.shields.io/npm/v/vite-plugin-vue-docs)
![license](https://img.shields.io/npm/l/vite-plugin-vue-docs)
![jest coverage](./badges/badge-statements.svg)

vite 插件 - 自动生成 vue 组件文档

[English](./README.md) | **中文**

![preview](./preview.png)

## 特点

- 支持热更新
- 快速启动，依赖于 vite，无需另起服务
- 自动生成组件导航
- ui 采用了<a href='https://youzan.github.io/vant-weapp/#/home'>`vant-ui`</a>的样式
- 核心方法覆盖率达到了 92.86%

## 使用

```shell
yarn add vite-plugin-vue-docs -D
```

```js
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
```

> 如需使用本地package需自行`link`

## 语法

* `emits`,`props`，在vue中有对应的写法，所以只需要在写法上加上注释，插件就会自动解析。
* `slots`也是自动生成，如需增加说明，只需在`<slot>`标签的上一行增加注释。

### ref

`ref` 一般调用的是methods当中的某一些方法，所以需要在方法上面加上`@vue-docs-ref`标识，并使用多行注释的方式。
注释规范参照[JavaScript编码规范-函数/方法注释](http://itmyhome.com/js/han_6570_fang_fa_zhu_shi.html)


```js
export default {
  methods: {
    /**
     * @vue-docs-ref
     * @description 这是一个say方法
     * @param {string} name 姓名
     * @param {number} age  年龄
     * @return {name: string, age: number}
     */
    say(name: string, age: number) {
      return {
        name,
        age,
      };
    },
  },
};
```

### 参数说明

| 名称          | 说明              | 必填      |
| ------------- | ----------------- | --------- |
| @vue-docs-ref | 通过`ref`调用标识 | **true**  |
| @description  | 描述信息          | **false** |
| @param        | 参数              | **false** |
| @return       | 返回值            | **false** |

## 计划

- 🚀 表示已经实现的功能 
- 👷 表示进行中的功能
- ⏳ 表示规划中的功能

| 功能                                         | 状态      |
| -------------------------------------------- | --------- |
| 打包成静态网页                               | ⏳ 规划中 |
| 页面跳转 history 模式 &#124;&#124; hash 模式 | ⏳ 规划中 |
| 可配置文档网站                               | ⏳ 规划中 |
| 修改文件直接热更新，无须 F5 刷新             | ⏳ 规划中 |
| 支持解析`slot`                               | 🚀 已完成 |
| 支持解析`ref`                                | 🚀 已完成 |
| 支持`defineComponent()`写法                  | 🚀 已完成 |
| 支持`type`多种类型                           | 🚀 已完成 |
| 自动生成路由                                 | 🚀 已完成 |

## changlog

[版本日志](./CHANGELOG.md)