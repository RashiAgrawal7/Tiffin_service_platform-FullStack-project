const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/auth-controllers.js')

router.post('/Signup',registerUser)

router.post('/login', loginUser)

module.exports = router;