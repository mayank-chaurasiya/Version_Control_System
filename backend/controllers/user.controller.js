const { connectClient, getDb } = require("../config/db");
var ObjectId = require("mongodb").ObjectId;

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = getDb();
    const users = await db.collection("users").find({}).limit(100).toArray();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching : ", error.message);
    res.status(500).send("Server error!!");
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    await connectClient();
    const db = getDb();
    const user = await db.collection("users").findOne({
      _id: new ObjectId(currentID),
    });
    if (!user) {
      return res.status(500).json({ message: "User not found!!" });
    }
    return res.json({ user, message: "Profile fetched!!" });
  } catch (error) {
    console.error("Error fetching user details : ", error.message);
    res.status(500).send("Server error!!");
  }
}

async function updateUserProfile(req, res) {
  res.send("Profile updated");
}

async function deleteUserProfile(req, res) {
  res.send("Profile deleted");
}

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
