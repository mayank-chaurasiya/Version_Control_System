const fs = require("fs").promises;
const path = require("path");

async function addToRepo() {
  console.log("Added file to the staging area.");
}

module.exports = { addToRepo };
