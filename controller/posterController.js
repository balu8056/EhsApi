const posterDb = require("../model/posterModel");
const jwt = require('jsonwebtoken');

exports.createPoster = async (req, res, next) => {
  let {
    name,
    category,
    subCategory,
    language,
    creator,
    imgUrl,
    priceGroup,
    description,
    originalPrice,
    discountPercentage,
    stocks,
    material,
    dimension,
    tags,
    sku,
    weight,
    additionalDetails,
    sale,
  } = req.body;

  const newPoster = await new posterDb({
    name,
    category,
    subCategory,
    language,
    creator,
    imgUrl,
    priceGroup,
    description,
    originalPrice,
    discountPercentage,
    stocks,
    material, 
    dimension,
    tags,
    sku,
    weight,
    additionalDetails,
    sale,
  });

  newPoster
    .save()
    .then((poster) => {
      res.status(200).json({
        message: "sucesfully created",
        poster: poster,
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.getPoster = (req, res, next) => {

  console.log(req.emailid);
  
  posterDb
    .find({ isActive: true })
    .populate("category", "title")
    .populate("subCategory", "title")
    .populate("material", "title imgUrl")
    .populate("dimension", "title imgUrl")
    .then((poster) => {
      res
        .status(200)
        .json({ posterData: poster, message: "succesfully loaded" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatePoster = async (req, res, next) => {
  let payload = req.body;
  let posterId = payload.posterId;

  let updateObj = {};
  payload.name ? (updateObj.name = payload.name) : null;
  payload.category ? (updateObj.category = payload.category) : null;
  payload.subCategory ? (updateObj.subCategory = payload.subCategory) : null;
  payload.language ? (updateObj.language = payload.language) : null;
  payload.creator ? (updateObj.creator = payload.creator) : null;
  payload.imgUrl ? (updateObj.imgUrl = payload.imgUrl) : null;
  payload.priceGroup ? (updateObj.priceGroup = payload.priceGroup) : null;
  payload.description ? (updateObj.description = payload.description) : null;
  payload.originalPrice
    ? (updateObj.originalPrice = payload.originalPrice)
    : null;
  payload.discountPercentage
    ? (updateObj.discountPercentage = payload.discountPercentage)
    : null;
  payload.stocks ? (updateObj.stocks = payload.stocks) : null;
  payload.material ? (updateObj.material = payload.material) : null;
  payload.dimension ? (updateObj.dimension = payload.dimension) : null;
  payload.tags ? (updateObj.tags = payload.tags) : null;
  payload.sku ? (updateObj.sku = payload.sku) : null;
  payload.weight ? (updateObj.weight = payload.weight) : null;
  payload.additionalDetails
    ? (updateObj.additionalDetails = payload.additionalDetails)
    : null;
  payload.sale ? (updateObj.sale = payload.sale) : null;

  try {
    let result = await posterDb
      .update({ _id: posterId }, updateObj, { multi: false })
      .exec();
    res.json({ updated: true, update: updateObj });
  } catch (err) {
    res.json({ errormessage: err });
  }
};

exports.deletePoster = async (req, res, next) => {
  let { posterId } = req.body;

  try {
    let result = await posterDb
      .update({ _id: posterId }, { isActive: false }, { multi: false })
      .exec();
    res.json({ deleted: true, message: "deleted Successfully!!!" });
  } catch (err) {
    res.json({ errormessage: err });
  }
};