const User = require('../models/UserModel')
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "saajriwaaj@2025";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired Token" });
  }
};

module.exports = auth;