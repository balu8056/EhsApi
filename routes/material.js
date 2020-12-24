const express = require("express");
const materialControl = require("../controller/materialController");
const storageUrl = require("../helpers/storageImg");
const verifyJwt = require("../middleware/jwt"); 

const router = express.Router();  

router.get("/getMaterial", verifyJwt, materialControl.getMaterial);

router.post(
  "/createMaterial",
  storageUrl.single("imgUrl"),
  materialControl.createMaterial
);

router.post("/updateMaterial", materialControl.updateMaterial);

router.post("/deleteMaterial", materialControl.deleteMaterial);

module.exports = router;
