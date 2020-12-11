const subCategoryDb = require("../model/subCategoryModel");

exports.getSubCategory = (req, res, next)=>{
    subCategoryDb
    .find({isActive: true})
    .then((subCategory) => {
      res
        .status(200)
        .json({ subCategory: subCategory, message: "succesfully loaded" });
    })
    .catch((err) => {
        res.json({error: err});
    });

}
exports.createSubCategory = async(req, res, next)=>{

    const {title, categoryId} = req.body;

    const newSubCategory = await new subCategoryDb({title, categoryId});

    newSubCategory
    .save()
    .then((subCategory) => {
      res.status(200).json({
        message: "sucesfully created",
        subCategory: subCategory,
      });
    })
    .catch((err) => {
        res.json({error: err});
    });
    
}
exports.updateSubCategory = async(req, res, next)=>{

    const payload = req.body;
    let subCategoryId = payload.subCategoryId;
    let updateObj = {};

    payload.title?updateObj.title=payload.title:null   

    try{
        let result = await subCategoryDb
        .update({ _id: subCategoryId }, updateObj, { multi: false })
        .exec();
      res.json({ updated: true, update: updateObj });
    }catch(err){
        res.json({error: err});
    }

    
}
exports.deleteSubCategory =async (req, res, next)=>{
      
    let {subCategoryId} = req.body;

    try {
        let result = await subCategoryDb
          .update({ _id: subCategoryId }, {isActive: false}, { multi: false })
          .exec()
        res.json({ deleted: true, message: "deleted Successfully!!!" });
      } catch (err) {
        res.json({ errormessage: err });
      }

}