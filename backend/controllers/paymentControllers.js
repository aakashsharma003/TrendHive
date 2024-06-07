const Order = require("../models/schema");

const processPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Hypothetical payment processing logic
    const paymentSuccess = true; // Simulate payment success
    if (paymentSuccess) {
      order.paymentStatus = "Paid";
      await order.save();
      res
        .status(200)
        .json({ message: "Payment processed successfully", order });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to process payment" });
  }
};

module.exports = {
  processPayment,
};
