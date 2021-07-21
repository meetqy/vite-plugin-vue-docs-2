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

createHtml(
  changelog,
  `<script>export default {name: 'ChangeLog'}</script>`,
  "ChangeLog"
);

createHtml(
  hello,
  `<script>export default {name: "HelloWorld"};</script>
<style scoped>
.card-version a {display: inline-block;height: 20px;margin: 3px;}
h1 {margin-bottom: 0 !important;}
.card-version img {border-radius: 0;}
</style>`,
  "HelloWorld"
);

function createHtml(file, data, saveName) {
  const result = md.render(fs.readFileSync(file, "utf-8").split("### 计划")[0]);
  const html = result
    .replace(/<h3>/g, `</div><div class="card"><h3>`)
    .replace("</div>", "")
    .replace(`<p><img src="./preview.png" alt="preview"></p>`, "")
    .replace(
      `<p><a href='https://meetqy.github.io/vite-plugin-vue-docs/#/docs' traget='_blank'>在线体验</a></p>`,
      ""
    )
    .replace(
      `<p><a href="./README.md">English</a> | <strong>中文</strong></p>`,
      ""
    );
  fs.writeFileSync(
    path.join(root, `./dist/template/${saveName}.vue`),
    `<template><section>${html}</div></section></template>${data}`
  );
}
