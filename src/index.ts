import { fork } from 'child_process';

const args = process.argv.slice(2);

function main() {
    const project = args[0];
    fork(`src/projects/${project}.ts`);
}


main();
