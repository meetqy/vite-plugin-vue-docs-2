import Pkg from "../package.json";
import chalk from "chalk";
import { Config } from "./index";
import humps from "humps";

const log = console.log;

export function serverLog(config: Config): void {
  const pkgInfo = `\n  ${Pkg.name} v${Pkg.version}`;
  log(`  ${chalk.cyan(pkgInfo)} ${chalk.green("docs running at: ")}\n`);

  log(`  > Docs:     ${chalk.red(config.base)}`);
}

export function toLine(str: string): string {
  return humps
    .decamelize(str, {
      separator: "-",
    })
    .replace(/^\/-/, "/");
}
