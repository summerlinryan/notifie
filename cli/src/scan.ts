import { exec as execCallback } from "child_process";
import { blameLine } from "git-blame-line";
import { promisify } from "util";
import { env } from "process";
import axios from "axios";

interface Todo {
  file: string;
  tag: string;
  line: number;
  text: string;
  ref: string;
  target: string;
}

export default async function scan(dir: string): Promise<void> {
  const apiKey = env.NOTIFIE_API_KEY;
  const exec = promisify(execCallback);
  let todos: Todo[] = [];

  if (!apiKey) {
    console.error("NOTIFIE_API_KEY is not set");
    return;
  }

  try {
    // TODO: Change to use leasot lib instead of exec
    const { stdout, stderr } = await exec(`leasot -x --reporter json ${dir}`);

    if (stderr) {
      console.error(`Leasot error`);
      return;
    }

    todos = JSON.parse(stdout) as Todo[];

    for (const todo of todos) {
      const blame = await blameLine(`${todo.file}:${todo.line}`);
      todo.target = todo.ref || blame.author;
    }
  } catch (error) {
    console.error(`Error executing leasot`);
    return;
  }

  try {
    await axios.post(
      `${env.NOTIFIE_API_URL}/api/todos`,
      {
        todos: todos,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
  } catch (error: any) {
    console.error(`${error.status} ${JSON.stringify(error.response.data)}`);
  }
}
