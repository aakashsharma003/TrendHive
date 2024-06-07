const express = require("express");
const {
  getAllProducts,
  getProductInfo,
  addNewProduct,
  UpdateProductWithId,
  deleteProductWithId,
} = require("../controllers/ProductController");
const { checkAdmin } = require("../middlewares/auth");
const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:productId", getProductInfo);
ProductRouter.post("/", checkAdmin, addNewProduct);
ProductRouter.put("/:productId", checkAdmin, UpdateProductWithId);
ProductRouter.delete("/:productId", checkAdmin, deleteProductWithId);

module.exports = ProductRouter;
