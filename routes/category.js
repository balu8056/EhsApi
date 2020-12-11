<<<<<<< HEAD
const express = require('express');
const categoryController = require('../controller/categoryController');
const router = express.Router();

router.get('/getCategory', categoryController.getCategory);

router.post('/createCategory', categoryController.createCategory);

router.post('/updateCategory', categoryController.updateCategory);

router.post('/deleteCategory', categoryController.deleteCategory);

=======
const express = require('express');
const categoryController = require('../controller/categoryController');
const router = express.Router();

router.get('/getCategory', categoryController.getCategory);

router.post('/createCategory', categoryController.createCategory);

router.post('/updateCategory', categoryController.updateCategory);

router.post('/deleteCategory', categoryController.deleteCategory);

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
module.exports = router;