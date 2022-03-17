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

const originalArgv = process.argv.slice(2);

function main() {
  console.log("Start:", originalArgv);
  fork(`src/projects/${argv.project}.ts`, originalArgv);
  setInterval(() => {
    console.log("Start:", originalArgv);
    fork(`src/projects/${argv.project}.ts`, originalArgv);
  }, 30000);
}

main();
