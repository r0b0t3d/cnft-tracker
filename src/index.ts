import { fork } from "child_process";
const yargs = require("yargs");

const argv = yargs
  .command("project", "which project", {
    year: {
      description: "project",
      alias: "prj",
      type: "string",
    },
  })
  .option("search", {
    alias: "s",
    description: "search value",
    type: "string",
  })
  .option("price", {
    alias: "p",
    description: "search value",
    type: "number",
  })
  .option("interval", {
    alias: "i",
    description: "interval time",
    type: "number",
  })
  .help()
  .alias("help", "h").argv;

const args = process.argv.slice(2);

// console.log({ argv: argv });

function main() {
  const [project, ...otherArgs] = args;
  fork(`src/projects/${project}.ts`, otherArgs);
  setInterval(() => {
    console.log("Start:", otherArgs);
    fork(`src/projects/${project}.ts`, otherArgs);
  }, 30000);
}

main();
