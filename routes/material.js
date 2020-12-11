<<<<<<< HEAD
const express = require('express');
const materialControl = require('../controller/materialController');

const router = express.Router();

router.get('/getMaterial', materialControl.getMaterial);

router.post('/createMaterial', materialControl.createMaterial);

router.post('/updateMaterial', materialControl.updateMaterial);

router.post('/deleteMaterial', materialControl.deleteMaterial);

=======
const express = require('express');
const materialControl = require('../controller/materialController');

const router = express.Router();

router.get('/getMaterial', materialControl.getMaterial);

router.post('/createMaterial', materialControl.createMaterial);

router.post('/updateMaterial', materialControl.updateMaterial);

router.post('/deleteMaterial', materialControl.deleteMaterial);

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
module.exports = router;