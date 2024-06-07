const express = require("express");
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const { checkAuth } = require("../middlewares/auth");
const CartRouter = express.Router();

CartRouter.get("/:userId", checkAuth, getUserCart);
CartRouter.post("/:userId/", checkAuth, addToCart);
CartRouter.put("/:userId/:productId", checkAuth, updateCartItem);
CartRouter.delete("/:userId/:productId", checkAuth, removeFromCart);

module.exports = CartRouter;
