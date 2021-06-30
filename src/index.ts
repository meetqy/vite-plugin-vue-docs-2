import type { Plugin } from "vite";
// import { transformMain } from "./main";

function vueDocs(): Plugin {
  return {
    name: "vite-plugin-vue-docs",
    configureServer(server) {
      server.watcher();
    },
  };
}

export default vueDocs;
