import { Command } from "commander";
import scan from "./scan.js";
const program = new Command();
program
    .command("scan <folder>")
    .description("Scan the specified repository folder for TODO/FIXME comments and create scheduled notifications")
    .action(async (dir) => {
    const todos = await scan(dir);
    console.log(todos);
});
program.parse(process.argv);
// TODO: add a command to send notifications
