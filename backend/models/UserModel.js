const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { 
    type: [String], 
    enum: ['user', 'admin'], 
    default: ['user'] // all new signups will be normal users
  },
  phone: { type: String, default: "" },
  address: {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    pincode: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    addressLine: { type: String, default: "" },
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User; 
