const mongoose = require("mongoose");

const schema = mongoose.Schema;

const categoryModel = new schema({
    title:{
        type: String
    },
    subCategory: {
        type: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "subcategory",
            }
          ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

module.exports = mongoose.model("category", categoryModel);