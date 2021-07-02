import Pkg from "../package.json";
import chalk from "chalk";
import { ResolvedConfig } from "vite";
import { Config } from "./index";

const log = console.log;

export function serverLog(resolvedConfig: ResolvedConfig, config: Config) {
  const pkgInfo = `\n  ${Pkg.name} v${Pkg.version}`;
  log(`  ${chalk.cyan(pkgInfo)} ${chalk.green("docs running at: ")}\n`);

  const location = `http://localhost:${resolvedConfig.server.port}${config.base}`;
  log(`  > Docs:     ${chalk.cyan(location)}`);
}
