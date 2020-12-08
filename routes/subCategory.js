const express = require('express');
const subCategoryControl = require('../controller/subcategoryController');
const router = express.Router();

router.get('/getSubCategory', subCategoryControl.getSubCategory);

router.post('/createSubCategory', subCategoryControl.createSubCategory);

router.post('/updateSubCategory', subCategoryControl.updateSubCategory);

router.post('/deleteSubCategory', subCategoryControl.deleteSubCategory);

module.exports = router;