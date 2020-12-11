<<<<<<< HEAD
const express = require('express');
const posterControl = require('../controller/posterController');
const router = express.Router();

const verifyJwt = require("../middleware/jwt");

router.get('/getPoster', verifyJwt, posterControl.getPoster);

router.post('/createPoster', posterControl.createPoster);

router.post('/updatePoster', posterControl.updatePoster);

router.post('/deletePoster', posterControl.deletePoster);

=======
const express = require('express');
const posterControl = require('../controller/posterController');
const router = express.Router();

const verifyJwt = require("../middleware/jwt");

router.get('/getPoster', verifyJwt, posterControl.getPoster);

router.post('/createPoster', posterControl.createPoster);

router.post('/updatePoster', posterControl.updatePoster);

router.post('/deletePoster', posterControl.deletePoster);

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
module.exports = router;