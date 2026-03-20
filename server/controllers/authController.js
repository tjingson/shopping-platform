const User = require("../models/User");
const jwt = require("jsonwebtoken");
const setTokenCookie = require("../utils/setTokenCookie");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    name,
    email,
    password
  });
  if (user) {
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    setTokenCookie(res, token);
    console.log("token:", token)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: "Logged out" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe
};