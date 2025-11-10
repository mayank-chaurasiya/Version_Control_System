const express = require("express");
const userController = require("../controllers/user.controller.js");

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/userProfile", userController.getUserProfile);
userRouter.put("/updateProfile", userController.updateUserProfile);
userRouter.delete("/deleteProfile", userController.deleteUserProfile);

module.exports = userRouter;
