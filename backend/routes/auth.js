const express = require("express");
const {
  signupController,
  signInController,
} = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signInController);
module.exports = authRouter;
