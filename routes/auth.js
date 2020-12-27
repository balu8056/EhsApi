const express = require('express');
const auth = require('../controller/authController');
const verifyJwt = require("../middleware/jwt"); 
const router = express.Router();

router.get('/getUsers',verifyJwt, auth.getUsers);

router.get('/getUserById/:authId',verifyJwt, auth.getUserById);

router.post('/signup', auth.checkAlreadyUserExist, auth.signup);
router.get('/activate/:token', auth.activateAccount);

router.post('/login', auth.login);

router.post('/updateUser', auth.getUpdateUserDetails, auth.updateUserDetails);

module.exports = router;