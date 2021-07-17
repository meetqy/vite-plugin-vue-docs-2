# vite-plugin-vue-docs

[![npm version](https://img.shields.io/npm/v/vite-plugin-vue-docs)](https://www.npmjs.com/package/vite-plugin-vue-docs)
![license](https://img.shields.io/npm/l/vite-plugin-vue-docs)
![Statements](https://img.shields.io/badge/statements-79.66%25-red.svg)
[![example deploy](https://github.com/meetqy/vite-plugin-vue-docs/actions/workflows/deploy.yml/badge.svg)](https://meetqy.github.io/vite-plugin-vue-docs/#/docs)

Parse `.vue` files and automatically generate corresponding documents.

[Online Website](https://meetqy.github.io/vite-plugin-vue-docs/#/docs)

**English** | [中文](./README.md)

![preview](./preview.png)

## Features

- Support hot update
- Quick start, rely on vite, no need to start another service
- Automatically generated component navigation
- `Demo` View online
- ui adopts the style of <a href='https://youzan.github.io/vant-weapp/#/home'>`vant-ui`</a>
- Core method coverage reached 92.86%

##Use

For usage, refer to [@vue docs/example](./packages/example/README.md)

> ^0.1.3 dependency `vue router`

## example

```shell
git clone https://github.com/meetqy/vite-plugin-vue-docs.git
yarn
yarn setup
yarn dev
```

## Syntax

- `emits`, `props`, and vue have corresponding wording, so just add a comment on the wording, and the plug-in will automatically parse it.
- `slots` is also generated automatically. If you need to add a description, you only need to add a comment on the previous line of the `<slot>` tag.

### ref

`red` generally calls methods in certain methods, so you need to add the `@vue-docs-ref` mark to the method, and use multi-line comments.
Annotation specification reference[JavaScript 编码规范-函数/方法注释](http://itmyhome.com/js/han_6570_fang_fa_zhu_shi.html)

```js
export default {
  methods: {
    /**
     * @vue-docs-ref
     * @description This is a say method
     * @param {string} name
     * @param {number} age
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

### Parameter Description

| Name          | Description                     | Required  |
| ------------- | ------------------------------- | --------- |
| @vue-docs-ref | Invoke identification via `ref` | **true**  |
| @description  | Descriptive information         | **false** |
| @param        | Parameters                      | **false** |
| @return       | Return value                    | **false** |

## Plan

- 🚀 means functions that have been implemented
- 👷 means functions in progress
- ⏳ means functions in planning

| Features                                                   | Status       |
| ---------------------------------------------------------- | ------------ |
| Packaged into a static web page                            | ⏳ Planning  |
| Configurable document website                              | ⏳ Planning  |
| Compatible`<script setup>`                                 | ⏳ Planning  |
| View source code                                           | ⏳ Planning  |
| Page jump history mode &#124;&#124; hash mode              | 🚀 Completed |
| View examples online                                       | 🚀 Completed |
| Modified files are directly hot-updated without F5 refresh | 🚀 Completed |
| Support parsing `slot`                                     | 🚀 Completed |
| Support parsing `ref`                                      | 🚀 Completed |
| Support `defineComponent()` writing method                 | 🚀 Completed |
| Support `type` multiple types                              | 🚀 Completed |
| Automatically generate routing                             | 🚀 Completed |

## changlog

[Version log](./CHANGELOG.md)
