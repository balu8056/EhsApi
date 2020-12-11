<<<<<<< HEAD
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const materialDimensionModel = new schema({
    title: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
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
=======
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const materialDimensionModel = new schema({
    title: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
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
>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
