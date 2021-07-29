import { ModuleNode, ViteDevServer } from "vite";
import { Config } from "./index";
import DocsRoute from "./route";
import { MODULE_NAME_VIRTUAL } from "./constants";
import { debug } from "./utils";

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
  const { watcher, ws } = server;

  function fullReload() {
    route.clean();
    getPagesVirtualModule(server);
    ws.send({
      type: "full-reload",
    });
  }

  watcher.on("change", (file) => {
    if (file.includes(config.root)) {
      debug.hmr("change %s", file);
      route.change(file);
    }
  });

  watcher.on("add", (file) => {
    if (file.includes(config.root)) {
      debug.hmr("add %s", file);
      fullReload();
    }
  });

  watcher.on("unlink", (file) => {
    if (file.includes(config.root)) {
      debug.hmr("unlink %s", file);
      fullReload();
    }
  });
}
