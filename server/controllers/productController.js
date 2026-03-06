const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Create product
const createProduct = async (req, res) => {
  const { name, price, stock, description, category, image } = req.body;

  const product = await Product.create({
    name,
    price,
    stock,
    description,
    category,
    image,
    user: req.user._id
  });

  res.status(201).json(product);
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.stock = req.body.stock ?? product.stock;
    product.description = req.body.description ?? product.description;
    product.category = req.body.category ?? product.category;
    product.image = req.body.image ?? product.image;
    product.user =  req.user._id;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};