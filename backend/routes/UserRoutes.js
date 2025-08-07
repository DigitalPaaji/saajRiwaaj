const express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')
const auth = require('../middleware/auth')

router.post('/signup',User.signup)
router.post('/login',User.login)
router.get('/logout',User.logout)
router.get('/',auth, User.getUser)


module.exports = router;