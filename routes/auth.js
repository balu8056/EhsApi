const express = require('express');
const auth = require('../controller/authController');
const router = express.Router();

router.get('/getUsers', auth.getUsers);

router.post('/signup', auth.checkAlreadyUserExist, auth.signup);

router.post('/login', auth.login);

router.post('/updateUser', auth.getUpdateUserDetails, auth.updateUserDetails);

const express = require('express');
const auth = require('../controller/authController');
const router = express.Router();

router.post('/signup', auth.signup);

router.post('/login', auth.login);

router.post('/updateUser', auth.updateUser);

module.exports = router;