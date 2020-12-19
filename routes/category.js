const express = require('express');


const categoryController = require('../controller/categoryController');

const router = express.Router();

router.get('/getCategory', categoryController.getCategory);

router.post('/createCategory', categoryController.createCategory);

router.post('/updateCategory', categoryController.updateCategory);

router.post('/deleteCategory', categoryController.deleteCategory);

module.exports = router;