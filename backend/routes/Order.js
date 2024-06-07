const express = require("express");
const {
  getOrders,
  getOrderById,
  placeOrder,
  updateOrder,
  cancelOrder,
} = require("../controllers/orderController");
const { checkAuth } = require("../middlewares/auth");
const OrderRouter = express.Router();

OrderRouter.get("/", getOrders);
OrderRouter.get("/:orderId", checkAuth, getOrderById);
OrderRouter.post("/", checkAuth, placeOrder);
OrderRouter.put("/:orderId", checkAuth, updateOrder);
OrderRouter.delete("/:orderId", checkAuth, cancelOrder);

module.exports = OrderRouter;
