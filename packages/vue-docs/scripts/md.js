/*eslint-disable*/

const path = require("path");
const fs = require("fs");
const hljs = require("highlight.js");
const md = require("markdown-it")({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
const root = process.cwd();
const changelog = path.join(root, "../../CHANGELOG.md");
const hello = path.join(root, "../../README.md");

fs.writeFileSync(
  "./README.md",
  fs.readFileSync(hello, "utf-8").replace("![preview](./preview.png)", "")
);

createHtml(
  changelog,
  `<script>export default {name: 'ChangeLog'}</script>`,
  "ChangeLog"
);

createHtml(
  hello,
  `<script>export default {name: "Readme"};</script>
<style scoped>
.card-version a {display: inline-block;height: 20px;margin: 3px;}
h1 {margin-bottom: 0 !important;}
.card-version img {border-radius: 0;}
</style>`,
  "Readme"
);

function createHtml(file, data, saveName) {
  const result = md.render(
    fs
      .readFileSync(file, "utf-8")
      .split("### 计划")[0]
      .replace("[English](./README.en.md) | **中文**", "")
  );

  const html = result
    .replace(/h3/g, "h4")
    .replace(/<h2>/g, '</div><div class="card"><h3>')
    .replace(/<\/h2>/g, "</h3>")
    // .replace(/<h3>/g, `</div><div class="card"><h3>`)
    .replace("</div>", "")
    .replace(`<p><img src="./preview.png" alt="preview"></p>`, "")
    .replace(`<p><img src="./preview.jpg" alt="preview"></p>`, "")
    .replace(
      `<p><a href='https://meetqy.github.io/vite-plugin-vue-docs/#/docs' traget='_blank'>在线体验</a></p>`,
      ""
    );
  fs.writeFileSync(
    path.join(root, `./dist/template/${saveName}.vue`),
    `<template><section>${html}</div></section></template>${data}`
  );
}
