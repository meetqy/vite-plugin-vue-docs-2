// @ts-nocheck

import fs from "fs";
import hbs from "handlebars";
import path from "path";

const template = fs.readFileSync(
  path.join(__dirname, "./template/index.hbs"),
  "utf-8"
);

hbs.registerHelper("handleType", function (options) {
  switch (options.data.index) {
    case 2: {
      return new hbs.SafeString(`<em>${this}</em>`);
    }
    case 4: {
      return new hbs.SafeString(`<code>${this}</code>`);
    }
    default: {
      return this;
    }
  }
});

export default hbs.compile(template);
