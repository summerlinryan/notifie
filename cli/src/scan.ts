import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { blameLine } from 'git-blame-line';

interface Todo {
  file: string;
  tag: string;
  line: number;
  text: string;
  ref: string;
  target: string;
}

export default async function scan(dir: string): Promise<Todo[]> {
  const exec = promisify(execCallback);
  let todos: Todo[] = [];

  try {
    const { stdout, stderr } = await exec(`leasot ${dir} --reporter json -x`);
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return todos;
    }

    todos = JSON.parse(stdout) as Todo[];
    
    for (const todo of todos) {
      const blame = await blameLine(`${todo.file}:${todo.line}`);
      todo.target = todo.ref || blame.author;
    }
  } catch (error) {
    console.error(`Error executing leasot: ${error}`);
  }

  return todos;
}

