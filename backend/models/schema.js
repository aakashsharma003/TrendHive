const mongoose = require("mongoose");

// Defining schema for Users collection
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone_number: String,
  address: String,
});

// Defining schema for Categories collection
const categorySchema = new mongoose.Schema({
  category_name: String,
  parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

// Defining schema for Products collection
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock_quantity: Number,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  sku: { type: String, unique: true },
  imageURL: String,
  rating: Number,
});

// Defining schema for Orders collection
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total_amount: Number,
  order_date: Date,
  status: String,
});

// Defining schema for Order_Items collection
const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  price: Number,
});

// Defining schema for Cart collection
const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Defining schema for Cart_Items collection
const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

// Defining schema for Wishlist collection
const wishlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Defining schema for Wishlist_Items collection
const wishlistItemSchema = new mongoose.Schema({
  wishlist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

// Defining schema for Reviews collection
const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: Number,
  comment: String,
  review_date: Date,
});

// Defining schema for Shipping collection
const shippingSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  shipping_address: String,
  shipping_date: Date,
  delivery_date: Date,
  status: String,
});

// Defining schema for Payment collection
const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  payment_method: String,
  payment_date: Date,
  amount: Number,
  status: String,
});

// Create models from the schemas
const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Order_Item = mongoose.model("Order_Item", orderItemSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Cart_Item = mongoose.model("Cart_Item", cartItemSchema);
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
const Wishlist_Item = mongoose.model("Wishlist_Item", wishlistItemSchema);
const Review = mongoose.model("Review", reviewSchema);
const Shipping = mongoose.model("Shipping", shippingSchema);
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
  User,
  Category,
  Product,
  Order,
  Order_Item,
  Cart,
  Cart_Item,
  Wishlist,
  Wishlist_Item,
  Review,
  Shipping,
  Payment,
};
