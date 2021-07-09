# v0.0.9

### Bugfix 

* 修复开发环境example不能监听.hbs模板文件改动
* 修复组件名称不显示

# v0.0.8

### Feature

* 新增`ref method`解析

### Bugfix

* fix: 终端文档端口号显示错误 #1

### Perf 

* Jest测试文件结构优化

# v0.0.7

### BugFix

* `Emits`模板渲染不显示
* `ts`在传参时定义类型报错

### Perf

* 优化处理`ast`的结构
* 优化代码格式化问题

# v0.0.6

### Bugfix

* 修复`props: {type: [string, number]}`解析失败bug
* 修复`emits: ["click"]`没写注释解析失败bug

### Chore

* 新增commit规范检查
* eslint+prettier代码规范
* 新增jest测试&用例


# v0.0.5

### Feature

* 兼容`export default {}`写法
* 新增导航栏
* 新增`header`头部

### Perf

* 优化开发环境
* hbs模板用变量声明的字符串，改为文件方式
* 优化404页面

# v0.0.4

build 失误多升级了一个版本

# v0.0.3

### Feature

* 默认值解析
* 类型解析支持多种类型 `name: [string, number]`
* 新增组件名称显示 `xxx-xxx`

### Bugfix

* index.d.ts路径错误问题
* 参数与变量名冲突导致报错

### Perf

* 类型显示为小写
* props参数显示格式改为`xxx-xxx`
* 所有空的参数显示为`-`




# v0.0.2

### Feature

* 启动时打印当前文档地址
* 路由地址修改 HelloWord -> /hello-world
* 新增可配置路由前缀
* 可监听文件修改/新增/删除

### Bugfix

* 删除文件路由依然存在
