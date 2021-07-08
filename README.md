# vite-plugin-vue-docs

![npm version](https://img.shields.io/npm/v/vite-plugin-vue-docs)
![license](https://img.shields.io/npm/l/vite-plugin-vue-docs)
![jest coverage](./badges/badge-statements.svg)

vite plugin-automatically generate vue component documentation

<a href="./README.zh.md">中文文档</a>

![preview](./preview.png)

## Features

- Support hot update
- Quick start, rely on vite, no need to start another service
- Automatically generated component navigation
- ui adopts the style of <a href='https://youzan.github.io/vant-weapp/#/home'>`vant-ui`</a>
- Core method coverage reached 92.86%

## Use

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
yarn example:dev
```

## Syntax

`emits`, `props`, and vue have corresponding wording, so just add a comment on the wording, and the plug-in will automatically parse it.

### ref

Ref generally calls methods in certain methods, so you need to add the `@vue-docs-ref` mark to the method, and use multi-line comments.

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
| Page jump history mode &#124;&#124; hash mode              | ⏳ Planning  |
| Configurable document website                              | ⏳ Planning  |
| Modified files are directly hot-updated without F5 refresh | ⏳ Planning  |
| Support parsing `slot`                                     | 👷 Progress  |
| Support parsing `ref`                                      | 👷 Completed  |
| Support `defineComponent()` writing method                 | 🚀 Completed |
| Support `type` multiple types                              | 🚀 Completed |
| Automatically generate routing                             | 🚀 Completed |

## changlog

[Version log](./CHANGELOG.md)
