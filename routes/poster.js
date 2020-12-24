const express = require('express');
const posterControl = require('../controller/posterController');
const router = express.Router();

const verifyJwt = require("../middleware/jwt");

router.get('/getPoster', verifyJwt, posterControl.getPoster);

router.post('/createPoster', posterControl.createPoster);

router.post('/updatePoster', posterControl.updatePoster);

router.post('/deletePoster', posterControl.deletePoster);

module.exports = router;