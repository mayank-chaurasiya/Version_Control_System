const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.controller.js");
const { addToRepo } = require("./controllers/add.controller.js");
const { commitRepo } = require("./controllers/commit.controller.js");
const { pushRepo } = require("./controllers/push.controller.js");
const { pullRepo } = require("./controllers/pull.controller.js");
const { revertRepo } = require("./controllers/revert.controller.js");

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer())
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
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const mongoURI = process.env.MONGODB_URI;
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Unable to connect : ", error));

  app.use(cors({ origin: "*" }));
  app.get("/", (req, res) => {
    res.send("Hello!! Everything is working perfectly..");
  });

  let user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("====================");
      console.log(user);
      console.log("====================");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("CRUD operations called");
    // -----------CRUD Operations------------
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}
