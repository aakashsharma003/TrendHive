const express = require("express");
const {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const { checkAuth } = require("../middlewares/auth");
const WishListRouter = express.Router();

WishListRouter.get("/:userId", checkAuth, getUserWishlist);
WishListRouter.post("/:userId/", checkAuth, addToWishlist);
WishListRouter.delete("/:userId/:productId", checkAuth, removeFromWishlist);
module.exports = WishListRouter;
