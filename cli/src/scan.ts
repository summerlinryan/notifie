import { exec } from 'child_process';

export default function scan(dir: string): void {
    exec(`leasot ${dir} --reporter json -x`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing leasot: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        const todos = JSON.parse(stdout);
        for (const todo of todos) {
          if (!todo.ref) {
            
          }
        }
    });
}
