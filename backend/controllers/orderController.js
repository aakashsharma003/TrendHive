const { Order, Order_Item } = require("../models/schema");

// Get orders by user ID
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });
    const orderItems = await Order_Item.find({ order_id: req.params.orderId });
    res.status(200).json({ order, orderItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { user_id, total_amount, order_date, status, items } = req.body;

    const newOrder = new Order({
      user_id,
      total_amount,
      order_date,
      status,
    });

    const savedOrder = await newOrder.save();

    const orderItems = items.map((item) => ({
      order_id: savedOrder._id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    await Order_Item.insertMany(orderItems);

    res.status(201).json({ order: savedOrder, orderItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder)
      return res.status(404).json({ error: "Order not found" });

    await Order_Item.deleteMany({ order_id: req.params.orderId });

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  placeOrder,
  updateOrder,
  cancelOrder,
};
