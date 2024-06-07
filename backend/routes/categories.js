const express = require("express");
const {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const { checkAdmin } = require("../middlewares/auth");
const categoriesRouter = express.Router();
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:categoryId", getCategoryById);
categoriesRouter.post("/", checkAdmin, addCategory);
categoriesRouter.put("/:categoryId", checkAdmin, updateCategory);
categoriesRouter.delete("/:categoryId", checkAdmin, deleteCategory);
module.exports = categoriesRouter;
