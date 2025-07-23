const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/SubCategoryModel');

router.post('/', subCategoryController.createCategory);
router.get('/', subCategoryController.getCategories);
router.delete('/:id', subCategoryController.deleteCategory);

module.exports = router;
