const express = require("express");
const { addShippingDetails } = require("../controllers/shippingControllers");
const { checkAuth } = require("../middlewares/auth");
const shippingRouter = express.Router();

shippingRouter.post("/:orderId", checkAuth, addShippingDetails);

module.exports = shippingRouter;
