const express = require("express");
const { checkAuth } = require("../middlewares/auth");
const {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.get("/:userId", checkAuth, getUserProfile);
UserRouter.put("/:userId", checkAuth, updateUserProfile);
UserRouter.delete("/:userId", checkAuth, deleteUserAccount);
module.exports = UserRouter;
