<template>
  <section>
    <h1 style="margin-bottom: 0">vite-plugin-vue-docs</h1>
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
    <div class="card">
      <h3 id="jie-shao">介绍</h3>
      <p>解析<code>.vue</code>文件，自动生成对应文档。</p>
    </div>
    <div class="card">
      <h3 id="you-shi">优势</h3>
      <ul>
        <li>支持热更新</li>
        <li>快速启动，依赖于 vite，无需另起服务</li>
        <li>自动生成组件导航</li>
        <li><code>Demo</code>在线查看</li>
        <li>
          ui 采用了<a href="https://youzan.github.io/vant-weapp/#/home"
            ><code>vant-ui</code></a
          >的样式
        </li>
        <li>核心方法覆盖率达到了 92.86%</li>
      </ul>
    </div>
    <div class="card">
      <h3 id="shi-yong">使用</h3>
      <h4 id="an-zhuang">安装</h4>
      <pre><code class="language-shell">yarn add vite-plugin-vue-docs -D
</code></pre>
      <h4 id="pei-zhi-vite-config.js">配置 vite-config.js</h4>
      <pre><code class="language-js"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">'vite'</span>;
<span class="hljs-keyword">import</span> vue <span class="hljs-keyword">from</span> <span class="hljs-string">'@vitejs/plugin-vue'</span>;
<span class="hljs-keyword">import</span> vueDocs <span class="hljs-keyword">from</span> <span class="hljs-string">'vite-plugin-vue-docs'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> defineConfig({
  <span class="hljs-attr">plugins</span>: [vue(), vueDocs()],
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-comment">// 必须添加这一行，否则无法使用</span>
      <span class="hljs-attr">vue</span>: <span class="hljs-string">'vue/dist/vue.esm-bundler.js'</span>,
    },
  },
});
</code></pre>
      <p>
        详细使用方法可参考
        <a href="./packages/example/README.md" target="_blank"
          >@vue-docs/example</a
        >
      </p>
    </div>
    <div class="card">
      <h3 id="config-pei-zhi-can-shu">config 配置参数</h3>
      <table>
        <thead>
          <tr>
            <th>参数</th>
            <th>说用</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>base</td>
            <td>文档路由地址</td>
          </tr>
          <tr>
            <td>componentDir</td>
            <td>组件路径 相对于 src</td>
          </tr>
          <tr>
            <td>vueRoute</td>
            <td>
              router 实例名称, eg: <code>const route = createRoute()</code>填写
              route
            </td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        <p>^0.1.3 依赖 <em>vue-router</em></p>
      </blockquote>
    </div>
    <div class="card">
      <h3 id="example">example</h3>
      <pre><code class="language-shell">git clone https://github.com/meetqy/vite-plugin-vue-docs.git
yarn
yarn setup
yarn dev
</code></pre>
    </div>
    <div class="card">
      <h3 id="yu-fa">语法</h3>
      <ul>
        <li>
          <code>emits</code>,<code>props</code>，在 vue
          中有对应的写法，所以只需要在写法上加上注释，插件就会自动解析。
        </li>
        <li>
          <code>slots</code
          >也是自动生成，如需增加说明，只需在<code>&lt;slot&gt;</code>标签的上一行增加注释。
        </li>
      </ul>
      <h4 id="ref">ref</h4>
      <p>
        <code>ref</code> 一般调用的是 methods
        当中的某一些方法，所以需要在方法上面加上<code>@vue-docs-ref</code>标识，并使用多行注释的方式。
        注释规范参照<a
          href="http://itmyhome.com/js/han_6570_fang_fa_zhu_shi.html"
          target="_blank"
          >JavaScript 编码规范-函数/方法注释</a
        >
      </p>
      <pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">/**
     * <span class="hljs-doctag">@vue</span>-docs-ref
     * <span class="hljs-doctag">@description </span>这是一个say方法
     * <span class="hljs-doctag">@param <span class="hljs-type">{string}</span> </span>name 姓名
     * <span class="hljs-doctag">@param <span class="hljs-type">{number}</span> </span>age  年龄
     * <span class="hljs-doctag">@return <span class="hljs-type">{name: string, age: number}</span></span>
     */</span>
    <span class="hljs-function"><span class="hljs-title">say</span>(<span class="hljs-params">name: string, age: number</span>)</span> {
      <span class="hljs-keyword">return</span> {
        name,
        age,
      };
    },
  },
};
</code></pre>
      <h4 id="can-shu-shuo-ming">参数说明</h4>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
            <th>必填</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>@vue-docs-ref</td>
            <td>通过<code>ref</code>调用标识</td>
            <td><em>true</em></td>
          </tr>
          <tr>
            <td>@description</td>
            <td>描述信息</td>
            <td><em>false</em></td>
          </tr>
          <tr>
            <td>@param</td>
            <td>参数</td>
            <td><em>false</em></td>
          </tr>
          <tr>
            <td>@return</td>
            <td>返回值</td>
            <td><em>false</em></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<style scoped>
.card-version a {
  display: inline-block;
  height: 20px;
  margin: 3px;
}

.card-version img {
  border-radius: 0;
}
</style>
