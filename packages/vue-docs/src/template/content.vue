<template>
  <section>
    <h1>{{ result.name }}</h1>

    <!-- @vite-plugin-vue-docs content template demo -->

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
      showSourceCode: false,
      // @vite-plugin-vue-docs content result
    };
  },
};
</script>
