import { Command } from "commander";
import scan from "./scan.js";

const program = new Command();

program
  .command("scan <folder>")
  .description(
    "Scan the specified repository folder for TODO/FIXME comments and create scheduled notifications",
  )
  .action(async (dir: string) => {
    await scan(dir);
  });

program.parse(process.argv);
