const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.post('/add',productController.createProduct)
router.get('/',productController.getAllProducts)
router.get('/id/:id',productController.getProductById)
router.delete('/:id',productController.deleteProductById)
router.put('/id/:id',productController.updateProductById)






module.exports = router;