const mongoose = require("mongoose");

const schema = mongoose.Schema;

const subcategoryModel = new schema({
    title:{
        type: String
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",  
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

module.exports = mongoose.model("subcategory", subcategoryModel);