const express = require('express');
const posterControl = require('../controller/posterController');
const storageUrl = require("../helpers/storageImg");
const router = express.Router();

const verifyJwt = require("../middleware/jwt");

router.get('/getPoster', verifyJwt, posterControl.getPoster);

router.post('/createPoster', storageUrl.single("imgUrl"), posterControl.createPoster);

router.post('/updatePoster', storageUrl.single("imgUrl"), posterControl.updatePoster);

router.post('/deletePoster', posterControl.deletePoster);

module.exports = router;