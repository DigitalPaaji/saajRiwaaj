const express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')

router.post('/signup',User.signup)
router.post('/login',User.login)


module.exports = router;