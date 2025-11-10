const { MongoClient } = require("mongodb");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

let client = null;

async function connectClient() {
  if (!client) {
    client = new MongoClient(URI);
    await client.connect();
  }
  return client;
}

function getClient() {
  if (!client)
    throw new Error("MongoClient not connected. Call connectClient() first.");
  return client;
}

function getDb(dbName = "GitData") {
  return getClient().db(dbName);
}

module.exports = { connectClient, getClient, getDb };
