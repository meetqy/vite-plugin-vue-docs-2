import { Route } from "./route";
import { Config } from "./index";
import { RenderData } from "./type";

// 创建 组件详情 路由
export function createContentRoute(
  route: Route,
  config: Config,
  componentIs: string,
  content: RenderData | null,
  sourceCode?: string
): string {
  return `{
    path: '${route.path.replace(config.base + "/", "")}',
    component: {
      template: \`${createCode(componentIs, sourceCode)}\`,
      data() {
        return {
          content: ${content && JSON.stringify(content)},
          showSourceCode: false
        }
      },
      methods: {
        
      }
    }
  }`;
}

function createCode(componentIs?: string, sourceCode?: string): string | null {
  sourceCode = sourceCode
    ?.replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125");
  const demo = `<div class="card">
      <h3>Demo</h3>
      <component is="${componentIs}"></component>
      <pre v-highlightjs v-show="showSourceCode"><code class="language-js">${sourceCode}</code></pre>
      <div class="source-code">
        <p style="text-align: center">
            <span style="cursor: pointer" @click="showSourceCode=!showSourceCode">
                {{showSourceCode ? '收起' : '展开'}}代码
            </span>
        </p>
      </div>
   </div>`;

  return `<section>
    <h1>{{ content.name }}</h1>
    
    ${componentIs ? demo : ""}
    
    <template v-for="type in ['props', 'emits', 'slots', 'methods']" :key="type">
      <div class="card" v-if="content[type]">
        <h3>{{ content[type].h3 }}</h3>
        <table>
          <thead>
            <tr>
              <th
                v-for="(item, index) in content[type].table.headers"
                :key="index"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in content[type].table.rows" :key="i">
              <td v-for="(v, k) in item" :key="k">
                <!-- 类型 -->
                <em v-if="type === 'props' && k === 2">{{ v }}</em>
                <!-- 必填 -->
                <code v-else-if="type === 'props' && k === 4">{{ v }}</code>
                <span v-else>{{ v }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </section>
`;
}

interface NavRoute {
  title: string;
  data: {
    path: string;
    name: string;
  }[];
}

export function createNavRoute(
  routes: Route[],
  config: Config
): NavRoute[] | [] {
  const nav = [];

  const { base } = config;

  if (config.showUse) {
    nav.push({
      data: [
        { path: config.base, name: "使用说明" },
        {
          path: base + "/changelog",
          name: "更新日志",
        },
      ],
      title: "使用指南",
    });
  }

  // 组件路由
  nav.push({
    data: routes,
    title: "组件",
  });

  return nav;
}