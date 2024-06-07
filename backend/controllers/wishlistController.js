const { Wishlist, Product, Wishlist_Item } = require("../models/schema");

const getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("items.product");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // Validate product ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already has a wishlist
    let wishlist = await Wishlist.findOne({ user_id: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user_id: userId });
      await wishlist.save();
    }

    // Check if the product already exists in the wishlist
    let wishlistItem = await Wishlist_Item.findOne({
      wishlist_id: wishlist._id,
      product_id: productId,
    });

    if (!wishlistItem) {
      // Add new item to wishlist
      wishlistItem = new Wishlist_Item({
        wishlist_id: wishlist._id,
        product_id: productId,
      });
      await wishlistItem.save();
    }

    return res.status(201).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.error("Error adding product to wishlist:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { items: { product: req.params.productId } } },
      { new: true }
    ).populate("items.product");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

module.exports = {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
};
