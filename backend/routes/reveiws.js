const express = require("express");
const {
  getProductReviews,
  addProductReview,
} = require("../controllers/reveiwControllers");
const { checkAuth } = require("../middlewares/auth");
const reviewRouter = express.Router();

reviewRouter.get("/:productId", getProductReviews);
reviewRouter.post("/:productId", checkAuth, addProductReview);

module.exports = reviewRouter;
