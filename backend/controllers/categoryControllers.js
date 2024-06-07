const { Category } = require("../models/schema");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to add category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ error: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    if (!deletedCategory)
      return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addCategory,
};
