/*eslint-disable*/
const fs = require("fs");
const path = require("path");

const readme = ["README.md", "README.zh.md"];

readme.map((item) => {
  const content = fs
    .readFileSync(path.join(process.cwd(), item), "utf-8")
    .replace("![preview](./preview.png)", "![preview](../../preview.png)")
    .replace(
      "[Version log](./CHANGELOG.md)",
      "[Version log](../../CHANGELOG.md)"
    )
    .replace(
      "![jest coverage](./packages/vue-docs/badges/badge-statements.svg)",
      "![jest coverage](./badges/badge-statements.svg)"
    );
  fs.writeFileSync(
    path.join(process.cwd(), `./packages/vue-docs/${item}`),
    content
  );
});
