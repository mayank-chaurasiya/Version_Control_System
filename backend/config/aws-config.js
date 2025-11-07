const { S3Client } = require("@aws-sdk/client-s3");

const { fromNodeProviderChain } = require("@aws-sdk/credential-providers");
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: fromNodeProviderChain()
});

const S3_BUCKET = process.env.S3_BUCKET || "s3-git-bucket";

module.exports = { s3, S3_BUCKET };
