<<<<<<< HEAD
const express = require('express');
const subCategoryControl = require('../controller/subcategoryController');
const router = express.Router();

router.get('/getSubCategory', subCategoryControl.getSubCategory);

router.post('/createSubCategory', subCategoryControl.createSubCategory);

router.post('/updateSubCategory', subCategoryControl.updateSubCategory);

router.post('/deleteSubCategory', subCategoryControl.deleteSubCategory);

=======
const express = require('express');
const subCategoryControl = require('../controller/subcategoryController');
const router = express.Router();

router.get('/getSubCategory', subCategoryControl.getSubCategory);

router.post('/createSubCategory', subCategoryControl.createSubCategory);

router.post('/updateSubCategory', subCategoryControl.updateSubCategory);

router.post('/deleteSubCategory', subCategoryControl.deleteSubCategory);

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
module.exports = router;