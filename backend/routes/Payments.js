const express = require("express");
const { processPayment } = require("../controllers/paymentControllers");
const { checkAuth } = require("../middlewares/auth");
const PaymentRouter = express.Router();

PaymentRouter.post("/payments/:orderId", checkAuth, processPayment);
module.exports = PaymentRouter;
