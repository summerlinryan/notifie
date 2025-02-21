import { Dirent } from "fs";
import { readdir, readFile } from "fs/promises";
import { extname, join } from "path";

interface Todo {
  line: number;
  message: string;
  gitAuthor: string;
}

interface FileTodos {
  file: string;
  todos: Todo[];
}

export default async function scanDirectory(dir: string): Promise<void> {
  try {
    const files = await getAllFiles(dir);

    await Promise.all(
      files.map(async (file: string) => {
        try {
          const content = await readFile(file, "utf8");
          const ext = extname(file);
          const todos = await leasot.parse(content, {
            extension: ext.slice(1),
          });
          leasot.report(todos, "json");
        } catch (err) {
          console.error(`Error parsing file ${file}:`, err);
          return {
            file,
            todos: [],
          };
        }
      }),
    );
  } catch (err) {
    console.error("Error scanning repository:", err);
    throw err;
  }
}

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry: Dirent) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllFiles(path);
      }
      return path;
    }),
  );

  return files.flat();
}
