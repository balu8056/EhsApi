const materialDimensionDb = require("../model/materialDimensionModel");
const base64_encode = require("../helpers/base64");

exports.getMaterial = (req, res, next) => {
  materialDimensionDb
    .find({ isActive: true })
    .then((metDim) => {
      res
        .status(200)
        .json({ materialDimension: metDim, message: "succesfully loaded" });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

/*
material id: 

  ["5fddad39a2a208c5a841ef27",
  "5fddae4fa2a208c5a841ef28",
  "5fddae65a2a208c5a841ef29"]

dimension id :

  ["5fddaf06a140cc897c457e4e",
  "5fddaf23a140cc897c457e4f",
  "5fddaf92ead92320b53fd952"]

*/

exports.createMaterial = async (req, res, next) => {
  const { title, type } = req.body;

  const imageAsBase64 = base64_encode(req.file.path);

  const newMetDim = await new materialDimensionDb({
    title,
    imgUrl: {
      data: imageAsBase64,
      contentType: "image/jpg",
    },
    type,
  });

  newMetDim
    .save()
    .then((metDim) => {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error(err);
      }

      res.status(200).json({
        message: "sucesfully created",
        materialDimension: metDim,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};
exports.updateMaterial = async (req, res, next) => {
  const payload = req.body;
  let materialId = payload.materialId;
  let updateObj = {};

  payload.title ? (updateObj.title = payload.title) : null;
  payload.imgUrl ? (updateObj.imgUrl = payload.imgUrl) : null;
  payload.type ? (updateObj.type = payload.type) : null;

  try {
    let result = await materialDimensionDb
      .update({ _id: materialId }, updateObj, { multi: false })
      .exec();
    res.json({ updated: true, update: updateObj });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};
exports.deleteMaterial = async (req, res, next) => {
  let { materialId } = req.body;

  if (materialId) {
    try {
      let result = await materialDimensionDb
        .update({ _id: materialId }, { isActive: false }, { multi: false })
        .exec();
      res.json({ deleted: true, message: "deleted Successfully!!!" });
    } catch (err) {
      res.status(400).json({ error: `${err}` });
    }
  } else {
    res.status(400).json({ error: "Provide material id!!!" });
  }
};
