const { ReturnDocument } = require("mongodb");
const { connectClient, getDb } = require("../config/db");
var ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");

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
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = getDb();
    const usersCollection = db.collection("users");

    //validate ID
    if (!ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    // const userObjectId = new ObjectId(currentID);

    // Update Fields
    let updateFields = {};

    if (email) {
      updateFields.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    // Perform update
    await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentID) },
      { $set: updateFields }
    );

    // Fetch the updated document
    const updatedUser = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });

    // Handle result
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    // Success
    return res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error while updating credentials : ", error.message);
    res.status(500).send("Server error!!");
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    await connectClient();
    const db = getDb();
    const usersCollection = db.collection("users");

    //validate ID
    if (!ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!!" });
    }

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found!!" });
    }

    res
      .status(200)
      .json({
        message: "User Profile Deleted Successfully",
        deletedUserEmail: user.email,
      });
  } catch (error) {
    console.error("Error while updating credentials : ", error.message);
    res.status(500).send("Server error!!");
  }
}

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
