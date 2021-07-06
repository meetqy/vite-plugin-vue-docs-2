# v0.0.6

### Chore

* 新增commit规范检查
* eslint+prettier代码规范


# v0.0.5

### Feature

* 兼容`export default {}`写法
* 新增导航栏
* 新增`header`头部

### Pref

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
