const mongoose = require("mongoose");

const schema = mongoose.Schema;

const materialDimensionModel = new schema({
    title: {
      type: String,
    },
    imgUrl: {
      data: String,
      contentType: String
    },
    // imgUrl: {
    //   type: String
    // },
    type: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});

//0 - Material 1 -dimension
module.exports = mongoose.model("MaterialDimension", materialDimensionModel);