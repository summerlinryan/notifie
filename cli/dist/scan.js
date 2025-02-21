import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { blameLine } from 'git-blame-line';
export default async function scan(dir) {
    const exec = promisify(execCallback);
    let todos = [];
    try {
        const { stdout, stderr } = await exec(`leasot ${dir} --reporter json -x`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return todos;
        }
        todos = JSON.parse(stdout);
        for (const todo of todos) {
            const blame = await blameLine(`${todo.file}:${todo.line}`);
            todo.target = todo.ref || blame.author;
        }
    }
    catch (error) {
        console.error(`Error executing leasot: ${error}`);
    }
    return todos;
}
