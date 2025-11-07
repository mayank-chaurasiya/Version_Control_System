const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.controller.js");
const { addToRepo } = require("./controllers/add.controller.js");
const { commitRepo } = require("./controllers/commit.controller.js");
const { pushRepo } = require("./controllers/push.controller.js");
const { pullRepo } = require("./controllers/pull.controller.js");
const { revertRepo } = require("./controllers/revert.controller.js");

yargs(hideBin(process.argv))
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the reqpository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addToRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("push", "Push commits to git repository", {}, pushRepo)
  .command("pull", "Pull commits from git repository", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    revertRepo
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;
