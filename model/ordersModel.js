const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ordersModel = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
    itemDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PosterModel" 
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaterialDimension",
    },
    dimension:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaterialDimension",
    },
    quantity: {
        type: Number
    },
    total: {
        type: String
    },
    status: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    }

},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

module.exports = mongoose.model("Orders", ordersModel);