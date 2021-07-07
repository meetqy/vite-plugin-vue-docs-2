import Pkg from "../package.json";
import chalk from "chalk";
import { ResolvedConfig } from "vite";
import { Config } from "./index";
import humps from "humps";

const log = console.log;

export function serverLog(
  resolvedConfig: ResolvedConfig,
  config: Config
): void {
  const pkgInfo = `\n  ${Pkg.name} v${Pkg.version}`;
  log(`  ${chalk.cyan(pkgInfo)} ${chalk.green("docs running at: ")}\n`);

  const location = `http://localhost:${resolvedConfig.server.port}${config.base}`;
  log(`  > Docs:     ${chalk.cyan(location)}`);
}

export function toLine(str: string): string {
  return humps
    .decamelize(str, {
      separator: "-",
    })
    .replace(/^\/-/, "/");
}
