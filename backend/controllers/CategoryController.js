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
    await Category.findByIdAndDelete(req.params.id);
    await ProductModel.updateMany({category:categoryId},{$unset:{category:""}})
    res.json({ message: "Category Deleted successfully" });
};
        