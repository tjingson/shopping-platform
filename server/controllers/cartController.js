const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity: 1 }],
    });
  } else {
    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ product: productId });
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
    // remove deleted products
    const validItems = cart.items.filter(item => item.product);

    // update DB if cleanup happened
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

  cart.items = [];

  await cart.save();

  res.json(cart);
};

const removeFromCart = async (req, res) => {

  const cart = await Cart.findOne({ user: req.user._id });

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