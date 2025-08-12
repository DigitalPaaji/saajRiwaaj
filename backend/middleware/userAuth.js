const User = require('../models/UserModel')
const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;

const userAuth  = async (req, res, next) => {
const token = req.cookies.userToken;
if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, USER_JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired Token" });
  }
};

module.exports = userAuth ;