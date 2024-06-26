const { Product } = require("../models/schema");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_id");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductInfo = async (req, res) => {
  // console.log(req.params.productId);

  try {
    const product = await Product.findById(req.params.productId);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error fetching product" });
  }
};

const addNewProduct = async (req, res) => {
  const {
    title,
    price,
    description,
    imageURL,
    stock_quantity,
    rating,
    category_id,
    sku,
  } = req.body;

  // Validation checks
  if (
    !title ||
    !price ||
    !description ||
    !imageURL ||
    !stock_quantity ||
    !category_id ||
    !sku
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(price) || isNaN(stock_quantity) || isNaN(rating)) {
    return res
      .status(400)
      .json({ message: "Price, stock quantity, and rating must be numbers" });
  }

  try {
    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU must be unique" });
    }

    const newProduct = new Product({
      title,
      price: Number(price),
      description,
      imageURL,
      stock_quantity: Number(stock_quantity),
      rating: Number(rating),
      category_id,
      sku,
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Added new product", product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding product" });
  }
};

// Update product by ID
const updateProductWithId = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      res.send({ message: "Updated product info", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating product" });
  }
};

// Delete product by ID
const deleteProductWithId = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (deletedProduct) {
      res.send({ message: "Deleted product successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error deleting product" });
  }
};
module.exports = {
  getAllProducts,
  getProductInfo,
  addNewProduct,
  updateProductWithId,
  deleteProductWithId,
};
