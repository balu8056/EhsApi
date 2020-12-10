const express = require('express');
const materialControl = require('../controller/materialController');

const router = express.Router();

router.get('/getMaterial', materialControl.getMaterial);

router.post('/createMaterial', materialControl.createMaterial);

router.post('/updateMaterial', materialControl.updateMaterial);

router.post('/deleteMaterial', materialControl.deleteMaterial);

module.exports = router;