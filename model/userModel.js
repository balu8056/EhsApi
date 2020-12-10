const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  emailid: {
    type: String,
  },
  password: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  address:{
      type: String,
  },
  isAccountActive:{
    type: Boolean,
    default: true
  },
  isActive:{
    type: Boolean,
    default: true
  }
}, {timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("User", userschema);