const express = require("express");

const cors = require("cors");
const authRouter = require("./auth");
const UserRouter = require("./user");
const ProductRouter = require("./products");
const OrderRouter = require("./Order");
const CartRouter = require("./Cart");
const WishListRouter = require("./wishlist");
const shippingRouter = require("./shipping");
const PaymentRouter = require("./Payments");
const categoriesRouter = require("./categories");
const reviewRouter = require("./reveiws");

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
router.use("/auth", authRouter);
router.use("/user", UserRouter);
router.use("/products", ProductRouter);
router.use("/orders", OrderRouter);
router.use("/cart", CartRouter);
router.use("/categories", categoriesRouter);
router.use("/wishlist", WishListRouter);
router.use("/shipping", shippingRouter);
router.use("/payments", PaymentRouter);
router.use("/reviews", reviewRouter);
module.exports = router;
