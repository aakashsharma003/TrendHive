const { Order } = require("../models/schema");

const addShippingDetails = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { shippingDetails: req.body },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to add shipping details" });
  }
};

module.exports = {
  addShippingDetails,
};
