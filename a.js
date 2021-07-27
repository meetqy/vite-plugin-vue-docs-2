const a = `{"path":"/element/abcd","name":"ElementAbcd","component":"() => import('/Users/meetqy/Desktop/vite-plugin-vue-docs/packages/example/.docs-cache/ElementAbcd.vue')"`;
const s = a.replace(/"\(\) => .*?\)"/, function (str, i) {
  return str.replace(/"/g, "");
});

console.log(s);
