const Category = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create({ name: req.body.name });        
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    const cats = await Category.find();
    res.json({cats});
};


exports.deleteCategory = async (req, res) => {
  try {
    // Delete the category
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete all products that belong to this category
    await ProductModel.deleteMany({ category: req.params.id });

    res.json({ message: "Category and its products deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
