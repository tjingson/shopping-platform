const Product = require("../models/Product");
const Cart = require("../models/Cart");
const fs = require("fs");
const path = require("path");

/*
UTILITY — delete image safely
*/
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(
    process.cwd(),
    imagePath.replace(/^\/+/, "")
  );

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

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
  console.log("REQ BODY:", req.body);
  const product = await Product.create({
    name,
    price,
    stock,
    description,
    category,
    image: image || "",
    user: req.user._id
  });
  res.status(201).json(product);
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  // delete old image if new image uploaded
  if (req.body.image && req.body.image !== product.image) {
    deleteImage(product.image);
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.stock = req.body.stock || product.stock;
  product.description = req.body.description || product.description;
  if (req.body.image) {
    product.image = req.body.image;
  }
  const updatedProduct = await product.save();
  res.json(updatedProduct);
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.image) {
    deleteImage(product.image);
  }
  await product.deleteOne();
  res.json({ message: "Product removed" });
  await Cart.updateMany(
    {},
    { $pull: { items: { product: req.params.id } } }
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};