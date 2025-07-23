// models/SubCategory.js
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
