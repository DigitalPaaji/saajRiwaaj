const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: `User already exists with the email "${userExists.email}".`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup Error: ", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    let token;
    let cookieName;

    if (user.role === "admin") {
      token = jwt.sign({ id: user._id, role: user.role }, process.env.ADMIN_JWT_SECRET, { expiresIn: "1d" });
      cookieName = "adminToken";
    } else {
      token = jwt.sign({ id: user._id, role: user.role }, process.env.USER_JWT_SECRET, { expiresIn: "1d" });
      cookieName = "userToken";
    }

    res
      .status(200)
      .cookie(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login Successful",
        token,
        user: { name: user.name, email: user.email, role: user.role },
      });
  } catch (err) {
    console.error("Login Failed: ", err);
    res.status(500).json({ message: "Server Error" });
  }
};


const logoutUser = (req, res) => {
  res.clearCookie("userToken").json({ message: "User Logged out Successfully." });
};

const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken").json({ message: "Admin Logged out Successfully." });
};


const getUser = async (req, res) => {
  if (!req.user) return res.status(204).send();
  const fullUser = await User.findById(req.user._id)
    .populate("cart.product")
    .populate("wishlist");

  res.status(200).json({ user: fullUser });
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // password field hide karne ke liye
      .populate("cart.product")
      .populate("wishlist");

    res.status(200).json({ users });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);

    const existing = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate("cart.product");
    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res
      .status(200)
      .json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    await user.populate("cart.product");
    res.status(200).json({ message: "Removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update cart quantity
const updateCartQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await user.save();
    await user.populate("cart.product");
    res.status(200).json({ message: "Quantity updated", cart: user.cart });
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  
  getUser,
  getAllUsers,
  changePassword,
  addToCart,
  addToWishlist,
  removeFromCart,
  updateCartQuantity,
  logoutAdmin,
  logoutUser,
};
