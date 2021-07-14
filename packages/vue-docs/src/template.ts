// // @ts-nocheck
// import fs from "fs";
// import hbs from "handlebars";
// import path from "path";
//
// const template = fs.readFileSync(
//   path.join(__dirname, "./template/index.hbs"),
//   "utf-8"
// );
//
// // helper
// hbs.registerHelper("handleType", function (options) {
//   switch (options.data.index) {
//     case 2: {
//       return new hbs.SafeString(`<em>${this}</em>`);
//     }
//     case 4: {
//       return new hbs.SafeString(`<code>${this}</code>`);
//     }
//     default: {
//       return this;
//     }
//   }
// });
//
// hbs.registerHelper("checkedNavActive", function (options) {
//   const route = options.data.root.route;
//   return route.path === this.path ? "active" : this;
// });
//
// // 注册代码片段
// registerPartial("style", "./template/style.css");
// registerPartial("content", "./template/content.hbs");
// registerPartial("nav", "./template/nav.hbs");
//
// function registerPartial(name: string, filePath: string) {
//   hbs.registerPartial(
//     name,
//     fs.readFileSync(path.join(__dirname, filePath), "utf-8")
//   );
// }
//
// export default hbs.compile(template);
