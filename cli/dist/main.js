"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const scan_1 = __importDefault(require("./scan"));
const program = new commander_1.Command();
program
    .command("scan <folder>")
    .description("Scan the specified repository folder for TODO/FIXME comments and create scheduled notifications")
    .action(async (dir) => {
    await (0, scan_1.default)(dir);
});
program.parse(process.argv);
