const { Review } = require("../models/schema");

const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const addProductReview = async (req, res) => {
  try {
    const newReview = new Review({
      ...req.body,
      product: req.params.productId,
      user: req.user.id, // Assuming user is attached to the request in auth middleware
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to add review" });
  }
};

module.exports = {
  getProductReviews,
  addProductReview,
};
