const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { connectClient, getDb } = require("../config/db");

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = getDb();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };
    const result = await usersCollection.insertOne(newUser);

    // result.insertedId contains the new document id
    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.json({ token, userId: result.insetId });
  } catch (error) {
    console.error("Error during sign up : ", error.message);
    res.status(500).send("Server error!!");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = getDb();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid credentials!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid credentials!!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error while login in : ", error.message);
    res.status(500).send("Server error!!");
  }
}

module.exports = {
  signup,
  login,
};
