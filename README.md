# vite-plugin-vue-docs

![npm version](https://img.shields.io/npm/v/vite-plugin-vue-docs)
![license](https://img.shields.io/npm/l/vite-plugin-vue-docs)
![jest coverage](./badges/badge-statements.svg)

vite plugin-automatically generate vue component documentation

![preview](./preview.png)

## Features

- Support hot update
- Quick start, rely on vite, no need to start another service
- Automatically generated component navigation
- ui adopts the style of `vant-ui`
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
| Support parsing `ref`                                      | 👷 Progress  |
| Support parsing `slot`                                     | 👷 Progress  |
| Support `defineComponent()` writing method                 | 🚀 Completed |
| Support `type` multiple types                              | 🚀 Completed |
| Automatically generate routing                             | 🚀 Completed |

## changlog

[Version log](./CHANGELOG.md)
