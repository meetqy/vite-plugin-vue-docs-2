<template>
  <section>
    <h1>{{ result.name }}</h1>

    <!--    <div class="card" v-if="componentIs">-->
    <!--      <h3>Demo</h3>-->
    <!--      <component :is="componentIs"></component>-->
    <!--      <pre-->
    <!--        v-highlightjs-->
    <!--        v-show="showDemo"-->
    <!--      ><code class="language-js">{{ demoCode }}</code></pre>-->
    <!--      <div class="source-code">-->
    <!--        <p style="text-align: center">-->
    <!--          <span style="cursor: pointer" @click="showDemo = !showDemo">-->
    <!--            {{ showDemo ? "收起" : "展开" }}代码-->
    <!--          </span>-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->

    <template v-for="type in types" :key="type">
      <div class="card" v-if="result[type]">
        <h3>{{ result[type].h3 }}</h3>
        <table>
          <thead>
            <tr>
              <th
                v-for="(item, index) in result[type].table.headers"
                :key="index"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in result[type].table.rows" :key="i">
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
</template>

<script>
export default {
  data() {
    return {
      types: ["props", "emits", "slots", "methods"],
      showDemo: false,
      result: {
        name: "el-alert",
        slots: {
          h3: "Slots",
          table: {
            headers: ["名称", "说明", "返回参数"],
            rows: [
              ["title", "-", "-"],
              ["default", "-", "-"],
            ],
          },
        },
        props: {
          h3: "Props",
          table: {
            headers: ["参数", "说明", "类型", "默认值", "必填"],
            rows: [
              ["title", "-", "string", "-", "false"],
              ["description", "-", "string", "-", "false"],
              ["type", "-", "string", "info", "false"],
              ["closable", "-", "boolean", "-", "false"],
              ["close-text", "-", "string", "-", "false"],
              ["show-icon", "-", "boolean", "-", "false"],
              ["center", "-", "boolean", "-", "false"],
              ["effect", "-", "string", "light", "false"],
            ],
          },
        },
      },
    };
  },
};
</script>
