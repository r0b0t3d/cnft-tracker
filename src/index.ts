import { fork } from 'child_process';

const args = process.argv.slice(2);

function main() {
    const [project, ...otherArgs] = args;
    fork(`src/projects/${project}.ts`, otherArgs);
}


main();
