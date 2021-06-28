import type { Plugin } from "vite";

function vueDocs(): Plugin {
  return {
    name: "vite-plugin-vue-docs",
    transform(code, id) {
      console.log(id, code);
      return null;
    },
  };
}

export default vueDocs;
