<<<<<<< HEAD
const materialDimensionDb = require("../model/materialDimensionModel");


exports.getMaterial = (req, res, next)=>{
    materialDimensionDb
    .find({isActive: true})
    .then((metDim) => {
      res
        .status(200)
        .json({ materialDimension: metDim, message: "succesfully loaded" });
    })
    .catch((err) => {
        res.json({error: err});
    });

}
exports.createMaterial = async(req, res, next)=>{

    const {title, imgUrl, type} = req.body;

    const newMetDim = await new materialDimensionDb({title, imgUrl, type});

    newMetDim
    .save()
    .then((metDim) => {
      res.status(200).json({
        message: "sucesfully created",
        materialDimension: metDim,
      });
    })
    .catch((err) => {
        res.json({error: err});
    });
    
}
exports.updateMaterial = async(req, res, next)=>{

    const payload = req.body;
    let materialId = payload.materialId;
    let updateObj = {};

    payload.title?updateObj.title=payload.title:null
    payload.imgUrl?updateObj.imgUrl=payload.imgUrl:null
    payload.type?updateObj.type=payload.type:null

    try{
        let result = await materialDimensionDb
        .update({ _id: materialId }, updateObj, { multi: false })
        .exec();
      res.json({ updated: true, update: updateObj });
    }catch(err){
        res.json({error: err});
    }

    
}
exports.deleteMaterial =async (req, res, next)=>{
      
    let {materialId} = req.body;

    try {
        let result = await materialDimensionDb
          .update({ _id: materialId }, {isActive: false}, { multi: false })
          .exec()
        res.json({ deleted: true, message: "deleted Successfully!!!" });
      } catch (err) {
        res.json({ errormessage: err });
      }

=======
const materialDimensionDb = require("../model/materialDimensionModel");


exports.getMaterial = (req, res, next)=>{
    materialDimensionDb
    .find({isActive: true})
    .then((metDim) => {
      res
        .status(200)
        .json({ materialDimension: metDim, message: "succesfully loaded" });
    })
    .catch((err) => {
        res.json({error: err});
    });

}
exports.createMaterial = async(req, res, next)=>{

    const {title, imgUrl, type} = req.body;

    const newMetDim = await new materialDimensionDb({title, imgUrl, type});

    newMetDim
    .save()
    .then((metDim) => {
      res.status(200).json({
        message: "sucesfully created",
        materialDimension: metDim,
      });
    })
    .catch((err) => {
        res.json({error: err});
    });
    
}
exports.updateMaterial = async(req, res, next)=>{

    const payload = req.body;
    let materialId = payload.materialId;
    let updateObj = {};

    payload.title?updateObj.title=payload.title:null
    payload.imgUrl?updateObj.imgUrl=payload.imgUrl:null
    payload.type?updateObj.type=payload.type:null

    try{
        let result = await materialDimensionDb
        .update({ _id: materialId }, updateObj, { multi: false })
        .exec();
      res.json({ updated: true, update: updateObj });
    }catch(err){
        res.json({error: err});
    }

    
}
exports.deleteMaterial =async (req, res, next)=>{
      
    let {materialId} = req.body;

    try {
        let result = await materialDimensionDb
          .update({ _id: materialId }, {isActive: false}, { multi: false })
          .exec()
        res.json({ deleted: true, message: "deleted Successfully!!!" });
      } catch (err) {
        res.json({ errormessage: err });
      }

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
}