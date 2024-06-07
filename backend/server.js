const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const connectDB = require("./data/db");
require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
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
} = require("./models/schema");

connectDB();

// const generateSampleData = async () => {
//   try {
//     await User.deleteMany({});
//     await Category.deleteMany({});
//     await Product.deleteMany({});
//     await Order.deleteMany({});
//     await Order_Item.deleteMany({});
//     await Cart.deleteMany({});
//     await Cart_Item.deleteMany({});
//     await Wishlist.deleteMany({});
//     await Wishlist_Item.deleteMany({});
//     await Review.deleteMany({});
//     await Shipping.deleteMany({});
//     await Payment.deleteMany({});

//     const users = [];
//     const categories = [];
//     const products = [];
//     const orders = [];
//     const orderItems = [];
//     const carts = [];
//     const cartItems = [];
//     const wishlists = [];
//     const wishlistItems = [];
//     const reviews = [];
//     const shippings = [];
//     const payments = [];

//     // Generate users
//     for (let i = 0; i < 10; i++) {
//       const hashedPassword = await bcrypt.hash("password", 12);
//       const user = new User({
//         name: faker.person.fullName(),
//         email: faker.internet.email(),
//         password: hashedPassword,
//         phone_number: faker.phone.number(),
//         address: faker.location.streetAddress(),
//       });
//       users.push(user);
//     }
//     await User.insertMany(users);

//     // Generate categories
//     for (let i = 0; i < 5; i++) {
//       const category = new Category({
//         category_name: faker.commerce.department(),
//         parent_category_id: null,
//       });
//       categories.push(category);
//     }
//     await Category.insertMany(categories);

//     // Generate products
//     for (let i = 0; i < 150; i++) {
//       const product = new Product({
//         title: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         price: parseFloat(faker.commerce.price()),
//         stock_quantity: faker.number.int({ min: 1, max: 100 }),
//         category_id:
//           categories[Math.floor(Math.random() * categories.length)]._id,
//         sku: faker.string.uuid(),
//         imageURL: faker.image.url(),
//         rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
//       });
//       products.push(product);
//     }
//     await Product.insertMany(products);

//     // Generate orders
//     for (let i = 0; i < 30; i++) {
//       const order = new Order({
//         user_id: users[Math.floor(Math.random() * users.length)]._id,
//         total_amount: faker.number.float({ min: 20, max: 1000 }),
//         order_date: faker.date.past(),
//         status: "Processing",
//       });
//       orders.push(order);
//     }
//     await Order.insertMany(orders);

//     // Generate order items
//     for (let i = 0; i < 100; i++) {
//       const orderItem = new Order_Item({
//         order_id: orders[Math.floor(Math.random() * orders.length)]._id,
//         product_id: products[Math.floor(Math.random() * products.length)]._id,
//         quantity: faker.number.int({ min: 1, max: 5 }),
//         price: faker.number.float({ min: 10, max: 1000 }),
//       });
//       orderItems.push(orderItem);
//     }
//     await Order_Item.insertMany(orderItems);

//     // Generate carts
//     for (let i = 0; i < 10; i++) {
//       const cart = new Cart({
//         user_id: users[i]._id,
//       });
//       carts.push(cart);
//     }
//     await Cart.insertMany(carts);

//     // Generate cart items
//     for (let i = 0; i < 50; i++) {
//       const cartItem = new Cart_Item({
//         cart_id: carts[Math.floor(Math.random() * carts.length)]._id,
//         product_id: products[Math.floor(Math.random() * products.length)]._id,
//         quantity: faker.number.int({ min: 1, max: 5 }),
//       });
//       cartItems.push(cartItem);
//     }
//     await Cart_Item.insertMany(cartItems);

//     // Generate wishlists
//     for (let i = 0; i < 10; i++) {
//       const wishlist = new Wishlist({
//         user_id: users[i]._id,
//       });
//       wishlists.push(wishlist);
//     }
//     await Wishlist.insertMany(wishlists);

//     // Generate wishlist items
//     for (let i = 0; i < 50; i++) {
//       const wishlistItem = new Wishlist_Item({
//         wishlist_id:
//           wishlists[Math.floor(Math.random() * wishlists.length)]._id,
//         product_id: products[Math.floor(Math.random() * products.length)]._id,
//       });
//       wishlistItems.push(wishlistItem);
//     }
//     await Wishlist_Item.insertMany(wishlistItems);

//     // Generate reviews
//     for (let i = 0; i < 100; i++) {
//       const review = new Review({
//         user_id: users[Math.floor(Math.random() * users.length)]._id,
//         product_id: products[Math.floor(Math.random() * products.length)]._id,
//         rating: faker.number.int({ min: 1, max: 5 }),
//         comment: faker.lorem.sentence(),
//         review_date: faker.date.past(),
//       });
//       reviews.push(review);
//     }
//     await Review.insertMany(reviews);

//     // Generate shippings
//     for (let i = 0; i < 30; i++) {
//       const shipping = new Shipping({
//         order_id: orders[i]._id,
//         shipping_address: faker.location.streetAddress(),
//         shipping_date: faker.date.past(),
//         delivery_date: faker.date.future(),
//         status: "Shipped",
//       });
//       shippings.push(shipping);
//     }
//     await Shipping.insertMany(shippings);

//     // Generate payments
//     for (let i = 0; i < 30; i++) {
//       const payment = new Payment({
//         order_id: orders[i]._id,
//         payment_method: "Credit Card",
//         payment_date: faker.date.past(),
//         amount: faker.number.float({ min: 20, max: 1000 }),
//         status: "Paid",
//       });
//       payments.push(payment);
//     }
//     await Payment.insertMany(payments);

//     console.log("Sample data inserted");
//     mongoose.disconnect();
//   } catch (error) {
//     console.error("Error inserting sample data:", error);
//     mongoose.disconnect();
//   }
// };

// generateSampleData();

// console.log(process.env);
const app = express();

// connectDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Our app is listening on port ${PORT}`);
});
