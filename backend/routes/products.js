const express = require("express");
const {
  getAllProducts,
  getProductInfo,
  addNewProduct,
  UpdateProductWithId,
  deleteProductWithId,
  updateProductWithId,
} = require("../controllers/productController");
const { checkAdmin } = require("../middlewares/auth");
const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:productId", getProductInfo);
// ProductRouter.post("/", checkAdmin, addNewProduct);
ProductRouter.post("/", addNewProduct);
ProductRouter.put("/:productId", checkAdmin, updateProductWithId);
// ProductRouter.delete("/:productId", checkAdmin, deleteProductWithId);
ProductRouter.delete("/:productId", deleteProductWithId);

module.exports = ProductRouter;
