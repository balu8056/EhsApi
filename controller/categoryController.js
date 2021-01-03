const categoryDb = require("../model/categoryModel");

const delSuc = "deleted Successfully!!!",
  idErr = "Provide category id!!!",
  titleErr = "Provide title!!!",
  sucLoad = "succesfully loaded",
  sucCreated = "sucesfully created";

exports.getCategory = (req, res, next) => {
  categoryDb
    .find({ isActive: true })
    .populate("subCategory")
    .then((category) => {
      res.status(200).json({ category: category, message: sucLoad });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.createCategory = async (req, res, next) => {
  const { title } = req.body;
  if (!title) res.status(400).json({ error: titleErr });
  else {
    const newCategory = await new categoryDb({ title });
    newCategory
      .save()
      .then((category) => {
        res.status(200).json({
          message: sucCreated,
          category: category,
        });
      })
      .catch((err) => {
        res.status(400).json({ error: `${err}` });
      });
  }
};

exports.updateCategory = async (req, res, next) => {
  const payload = req.body;
  const categoryId = payload.categoryId;
  if (!categoryId) {
    res.status(400).json({ error: idErr });
  } else {
    let updateObj = {};
    payload.title ? (updateObj.title = payload.title) : null;
    payload.subCategory ? (updateObj.subCategory = payload.subCategory) : null;
    try {
      let result = await categoryDb
        .updateOne({ _id: categoryId }, updateObj)
        .exec();
      res.json({ updated: true, update: updateObj });
    } catch (err) {
      res.status(400).json({ updated: false, error: `${err}` });
    }
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { categoryId } = req.body;
  if (!categoryId) res.status(400).json({ error: idErr });
  else {
    try {
      let result = await categoryDb
        .updateOne({ _id: categoryId }, { isActive: false })
        .exec();
      res.json({ deleted: true, message: delSuc });
    } catch (err) {
      res.status(400).json({deleted: false, error: `${err}` });
    }
  }
};
