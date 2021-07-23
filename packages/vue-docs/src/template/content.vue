<template>
  <section>
    <h1>{{ content.name }}</h1>

    <div class="card" v-if="componentIs">
      <h3>Demo</h3>
      <component :is="componentIs"></component>
      <pre
        v-highlightjs
        v-show="showDemo"
      ><code class="language-js">{{ demoCode }}</code></pre>
      <div class="source-code">
        <p style="text-align: center">
          <span style="cursor: pointer" @click="showDemo = !showDemo">
            {{ showDemo ? "收起" : "展开" }}代码
          </span>
        </p>
      </div>
    </div>

    <template v-for="type in types" :key="type">
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
</template>

<script>
export default {
  props: {
    content: Object,
    demoCode: String,
    componentIs: String,
  },

  data() {
    return {
      types: ["props", "emits", "slots", "methods"],
      showDemo: false,
    };
  },
};
</script>
