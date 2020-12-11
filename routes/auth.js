<<<<<<< HEAD
const express = require('express');
const auth = require('../controller/authController');
const router = express.Router();

router.get('/getUsers', auth.getUsers);

router.post('/signup', auth.checkAlreadyUserExist, auth.signup);

router.post('/login', auth.login);

router.post('/updateUser', auth.getUpdateUserDetails, auth.updateUserDetails);

=======
const express = require('express');
const auth = require('../controller/authController');
const router = express.Router();

router.post('/signup', auth.signup);

router.post('/login', auth.login);

router.post('/updateUser', auth.updateUser);

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
module.exports = router;