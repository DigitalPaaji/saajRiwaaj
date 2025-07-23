const SubCategory = require('../models/SubCategoryModel');
const ProductModel = require('../models/ProductModel');

exports.createCategory = async (req, res) => {
    try {
        const SubCategory = await SubCategory.create({ name: req.body.name });        
        res.status(201).json(SubCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    const cats = await SubCategory.find();
    res.json({cats});
};


exports.deleteCategory = async (req, res) => {
    await SubCategory.findByIdAndDelete(req.params.id);
    await ProductModel.updateMany({SubCategory: SubCategory},{$unset:{SubCategory:""}})
    res.json({ message: "SubCategory Deleted successfully" });
};
        