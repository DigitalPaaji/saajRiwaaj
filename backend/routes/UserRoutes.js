const express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')
const auth = require('../middleware/auth')

router.post('/signup',User.signup)
router.post('/login',User.login)
router.get('/user/logout',User.logoutUser)
router.get('/admin/logout',User.logoutAdmin)


router.get('/',auth, User.getUser)
router.post('/cart', auth, User.addToCart);
router.post('/wishlist', auth, User.addToWishlist);
router.delete('/cart/:productId', auth, User.removeFromCart);
router.put('/cart', auth, User.updateCartQuantity);
router.get('/all', User.getAllUsers);

module.exports = router;