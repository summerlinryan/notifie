"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const leasot_1 = require("leasot");
const path_1 = require("path");
async function scanDirectory(dir) {
    try {
        const files = await getAllFiles(dir);
        await Promise.all(files.map(async (file) => {
            try {
                const content = await (0, promises_1.readFile)(file, "utf8");
                const ext = (0, path_1.extname)(file);
                const todos = await (0, leasot_1.parse)(content, { extension: ext.slice(1) });
                (0, leasot_1.report)(todos, "json");
            }
            catch (err) {
                console.error(`Error parsing file ${file}:`, err);
                return {
                    file,
                    todos: [],
                };
            }
        }));
    }
    catch (err) {
        console.error("Error scanning repository:", err);
        throw err;
    }
}
exports.default = scanDirectory;
async function getAllFiles(dir) {
    const entries = await (0, promises_1.readdir)(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
        const path = (0, path_1.join)(dir, entry.name);
        if (entry.isDirectory()) {
            return getAllFiles(path);
        }
        return path;
    }));
    return files.flat();
}
