const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config.js");
const {
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

// Helper to convert a readable stream (v3 Body) to a Buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".myGit");

  try {
    const cmd = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: "commits/",
    });
    const data = await s3.send(cmd);

    const objects = data.Contents || [];

    for (const object of objects) {
      const key = object.Key;
      const filePath = path.join(repoPath, key);
      const dir = path.dirname(filePath);

      await fs.mkdir(dir, { recursive: true });

      // Download object
      const getCmd = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
      const getRes = await s3.send(getCmd);

      // getRes.Body is a stream in Node; convert to Buffer
      const bodyStream = getRes.Body;
      const buffer = await streamToBuffer(bodyStream);

      await fs.writeFile(filePath, buffer);
      console.log(`Pulled: ${key}`);
    }

    console.log("All commits pulled from s3");
  } catch (error) {
    console.log("Unable to pull : ", error);
  }
}

module.exports = { pullRepo };
