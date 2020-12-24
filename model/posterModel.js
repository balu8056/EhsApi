const mongoose = require("mongoose");

const schema = mongoose.Schema;

const posterModel = new schema(
  {
    name: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
    },
    language: {
      type: String,
    },
    creator: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    priceGroup: {
      type: String,
    },
    description: {
      type: String,
    },
    originalPrice: {
      type: String,
    },
    discountPercentage: {
      type: String,
    },
    stocks: {
      type: Number,
    },
    rating: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          rating: {
            type: String,
          },
        },
      ],
      default: [],
    },
    bought: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          feedback: {
            type: String,
          },
        },
      ],
      default: [],
    },
    material: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MaterialDimension",
        },
      ],
    },
    dimension: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MaterialDimension",
        },
      ],
    },
    tags: {
      type: String,
    },
    sku: {
      type: String,
    },
    weight: {
      type: String,
    },
    additionalDetails: {
      type: String,
    },
    sale: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("PosterModel", posterModel);
