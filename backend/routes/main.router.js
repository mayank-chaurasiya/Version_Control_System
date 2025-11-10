const express = require("express");
const authRouter = require("./auth.router.js");
const userRouter = require("./user.router.js");
const repoRouter = require("./repo.router.js");
const issueRouter = require("./issue.router.js");

const mainRouter = express.Router();

mainRouter.use(authRouter, userRouter, repoRouter, issueRouter);

mainRouter.get("/", (req, res) => {
  res.send("Hello!! Everything is working perfectly..");
});

module.exports = mainRouter;
