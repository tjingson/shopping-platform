const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  if (!productId) {
    return res.status(400).json({ message: "Product ID required" });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity: 1 }]
    });
  } else {
    const item = cart.items.find(
      i => i.product.toString() === productId
    );
    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }
    await cart.save();
  }
  res.json(cart);
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }
    const validItems = cart.items.filter(item => item.product);
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.json({ items: [] });
  }
  cart.items = [];
  await cart.save();
  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.json({ items: [] });
  }
  cart.items = cart.items.filter(
    item => item.product.toString() !== req.params.productId
  );
  await cart.save();
  res.json(cart);
};

module.exports = {
  addToCart,
  getCart,
  clearCart,
  removeFromCart
};