const { Review } = require("../models/schema");

const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product_id: req.params.productId,
    });

    const reviews2 = await Review.find({
      product_id: "66612ca87fa2d7f414e567ac",
    });
    console.log(reviews);
    console.log(reviews2);
    res.status(200).send({ reviews: reviews.length == 0 ? reviews2 : reviews });
  } catch (err) {
    console.log(err);
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
