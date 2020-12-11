const categoryDb = require("../model/categoryModel");

exports.getCategory = (req, res, next)=>{
    categoryDb
    .find({isActive: true})
    .populate('subCategory')
    .then((category) => {
      res
        .status(200)
        .json({ category: category, message: "succesfully loaded" });
    })
    .catch((err) => {
        res.json({error: err});
    });
};

exports.createCategory = async(req, res, next)=>{
    const {title} = req.body;
    const newCategory = await new categoryDb({title });
    newCategory
    .save()
    .then((category) => {
      res.status(200).json({
        message: "sucesfully created",
        category: category,
      });
    })
    .catch((err) => {
        res.json({error: err});
    });
};

exports.updateCategory = async(req, res, next)=>{
    const payload = req.body;
    let categoryId = payload.categoryId;
    let updateObj = {};
    payload.title?updateObj.title=payload.title:null
    payload.subCategory?updateObj.subCategory=payload.subCategory:null
    try{
        let result = await categoryDb
        .update({ _id: categoryId }, updateObj, { multi: false })
        .exec();
      res.json({ updated: true, update: updateObj });
    }catch(err){
        res.json({error: err});
    }
};
  
exports.deleteCategory =async (req, res, next)=>{      
    let {categoryId} = req.body;
    try {
        let result = await categoryDb
          .update({ _id: categoryId }, {isActive: false}, { multi: false })
          .exec()
        res.json({ deleted: true, message: "deleted Successfully!!!" });
      } catch (err) {
        res.json({ errormessage: err });
      }
};