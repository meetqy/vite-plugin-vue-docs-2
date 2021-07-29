# 更新日志

### v0.1.9

### Refactor

* 重构`hmr`

### v0.1.8

#### Feature

* 新增脚本更加`README`，`CHANGELOG`自动生成使用指南

#### Perf

* `example` 打包优化
* `vue-docs` 打包优化

### v0.1.7

#### Bugfix

* 修复`使用指南`内容区域打包后不显示

### v0.1.6

#### Feature

- 生成文档时，新增`使用说明`
- 生成文档是，新增`更新日志`
- 可自定义网站名称

#### Perf

- `transformMain`方法改为`vueToJsonData`

#### Bugfix

- 修复 demo 代码中`{{ }}`包裹的变量解析失败

### v0.1.5

#### Perf

- `example`在线部署
- 在线 demo 查看代码美化

#### Bugfix

- 修复 [#3, F5 刷新返回首页](https://github.com/meetqy/vite-plugin-vue-docs/issues/3)
- 修复 /docs 页面被用户内容所覆盖
- 修复 `vite build`打包没有路由

### v0.1.4

#### Feature

- 在线展示 demo

#### Perf

- 优化`jest badge`生成
- 删除多余代码

### v0.1.3

#### BugFix

- 修复路径跳转
- 修复`vue-router`实例名称不为`router`报错

### v0.1.1, v0.1.2

#### Feature

- 新增`transformMain`方法,可将 vue 转换为 html 文档
- `hmr`文件改动无需 `F5`刷新

#### Perf

- `hbs`模板改为`vue`模板
- 服务器控制路由改为`vue-router`

### v0.0.11, v0.1.0

#### BugFix

- 修复`Cannot find module **`#2

### v0.0.10

#### Feature

- 新增打开浏览器配置项
- `lerna`管理项目

### v0.0.9

#### Feature

- 新增`Slot`解析

#### Bugfix

- 修复开发环境 example 不能监听.hbs 模板文件改动
- 修复组件名称不显示

#### Perf

- 简化开发环境配置与安装

### v0.0.8

#### Feature

- 新增`ref method`解析

#### Bugfix

- fix: 终端文档端口号显示错误 #1

#### Perf

- Jest 测试文件结构优化

### v0.0.7

#### BugFix

- `Emits`模板渲染不显示
- `ts`在传参时定义类型报错

#### Perf

- 优化处理`ast`的结构
- 优化代码格式化问题

### v0.0.6

#### Bugfix

- 修复`props: {type: [string, number]}`解析失败 bug
- 修复`emits: ["click"]`没写注释解析失败 bug

#### Chore

- 新增 commit 规范检查
- eslint+prettier 代码规范
- 新增 jest 测试&用例

### v0.0.5

#### Feature

- 兼容`export default {}`写法
- 新增导航栏
- 新增`header`头部

#### Perf

- 优化开发环境
- hbs 模板用变量声明的字符串，改为文件方式
- 优化 404 页面

### v0.0.4

build 失误多升级了一个版本

### v0.0.3

#### Feature

- 默认值解析
- 类型解析支持多种类型 `name: [string, number]`
- 新增组件名称显示 `xxx-xxx`

#### Bugfix

- index.d.ts 路径错误问题
- 参数与变量名冲突导致报错

#### Perf

- 类型显示为小写
- props 参数显示格式改为`xxx-xxx`
- 所有空的参数显示为`-`

### v0.0.2

#### Feature

- 启动时打印当前文档地址
- 路由地址修改 HelloWord -> /hello-world
- 新增可配置路由前缀
- 可监听文件修改/新增/删除

#### Bugfix

- 删除文件路由依然存在
