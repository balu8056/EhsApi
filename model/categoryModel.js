<<<<<<< HEAD
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

=======
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

>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
