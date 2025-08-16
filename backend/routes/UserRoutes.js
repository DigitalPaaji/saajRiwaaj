const express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')
const auth = require('../middleware/userAuth')
const isAdmin = require('../middleware/adminAuth')

router.post('/signup',User.signup)
// router.post('/login',User.login)
router.post('/loginUser',User.loginUser)
router.post('/loginAdmin',User.loginAdmin)
router.get('/userlogout',User.logoutUser)
router.get('/adminlogout',User.logoutAdmin)
router.get('/admin', isAdmin, User.getAdmin)
router.get('/',auth, User.getUser)
router.post('/cart', auth, User.addToCart);
router.post('/wishlist', auth, User.addToWishlist);
router.delete('/cart/:productId', auth, User.removeFromCart);
router.put('/cart', auth, User.updateCartQuantity);
router.get('/all', isAdmin, User.getAllUsers);
router.post('/forgot-password', User.forgotPassword);
router.put('/reset-password/:token', User.resetPassword);
router.get('/reset-token/:token',User.checkTokenValidity)

module.exports = router;