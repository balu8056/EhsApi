const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userschema = mongoose.Schema(
  {
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
    address: {
      type: String,
    },
    isAccountActive: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userschema.pre('save', function(next) {
  const user = this;
  if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    console.log("user ,pre saving "+user.emailid);
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) {
        console.log('Error hashing password for user', user.emailid);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

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