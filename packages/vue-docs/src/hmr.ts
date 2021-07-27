import { ModuleNode, ViteDevServer } from "vite";
import { Config } from "./index";
import DocsRoute from "./route";
import { MODULE_NAME_VIRTUAL } from "./constants";

export function getPagesVirtualModule(
  server: ViteDevServer
): ModuleNode | null {
  const { moduleGraph } = server;
  const module = moduleGraph.getModuleById(MODULE_NAME_VIRTUAL);
  if (module) {
    moduleGraph.invalidateModule(module);
    return module;
  }
  return null;
}

export function hmr(
  server: ViteDevServer,
  config: Config,
  route: DocsRoute
): void {
  const { ws, watcher } = server;

  watcher.on("change", (file) => {
    if (file.includes(config.root)) {
      const result = route.change(file);
      ws.send({
        type: "custom",
        event: "special-update",
        data: {
          content: result,
        },
      });
      // if (result) {
      //   getPagesVirtualModule(server);
      //
      //   ws.send({
      //     type: "full-reload",
      //   });
      // }
    }
  });
}
