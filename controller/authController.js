const userDb = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

exports.getUsers = (req, res, next) => {
  userDb.find({}, '_id firstname lastname emailid phonenumber address isAccountActive isActive')
    .then(users=>{
      res.status(200).json({users: users});
    })
    .catch(err=>{
      res.status(400).json({ error: `${err}` });
    })
};

exports.checkAlreadyUserExist = (req, res, next) => {
  const { emailid } = req.body;

  userDb
    .findOne({ emailid })
    .then((userRes) => {
      if (userRes) 
        res.status(400).json({ message: "User Already Exists!!!" });
      else 
        next();
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.signup =async (req, res, next) => {
    const {
      firstname,
      lastname,
      emailid,
      phonenumber,
      password,
      address,
    } = req.body;

    let newUser = await new userDb({
      firstname,
      lastname,
      emailid,
      phonenumber,
      password,
      address
    });

    newUser
      .save()
      .then((user) => {
        res.status(200).json({
          message: "User Created Successfully",
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            emailid: user.emailid,
          }
        });
      })
      .catch((err) => {
        res.status(400).json({ error: `${err}` });
      });
};

exports.login = (req, res, next) => {
  const { emailid, password } = req.body;
  userDb
    .findOne({ emailid: emailid, isAccountActive: true, isActive: true })
    .then((userRes) => {
      if (!userRes) {
        res.status(400).json({ message: "user not found!!!" });
      } else {
        bcrypt.compare(password, userRes.password, (err, isSame) => {
          if (!isSame) {
            res.status(400).json({ message: "password doesn't match!!!" });
          } else {
            const token = jwt.sign({ emailid: userRes.emailid, userid: userRes._id },
              process.env.SECRET, {expiresIn: 86400 }
            );

            res.status(200).json({
              message: "Logged in successfully!!!",
              token: token,
              user: {
                userid: userRes.userid,
                firstname: userRes.firstname,
                lastname: userRes.lastname,
                emailid: userRes.emailid
              }
            });
          }
        });
      }
    }).catch(err=>{
      res.status(400).json({ error: `${err}` });
    });
};

exports.getUpdateUserDetails = (req, res, next) => {

  req.updateObj = {};

  const payload = req.body;
  const {emailid} = req.body;

  payload.firstname ? (req.updateObj.firstname = payload.firstname) : null;
  payload.lastname ? (req.updateObj.lastname = payload.lastname) : null;
  payload.phonenumber ? (req.updateObj.phonenumber = payload.phonenumber) : null;
  payload.address ? (req.updateObj.address = payload.address) : null;
  payload.isAccountActive ? (req.updateObj.isAccountActive = payload.isAccountActive) : null;

  if (payload.oldpassword) {
    userDb
      .findOne({ emailid })
      .then((userRes) => {
        if (!userRes) {
          res.status(400).json({ message: "user not found" });
        }else{
          bcrypt.compare(payload.oldpassword, userRes.password, (err, isSame) => {
            if (!isSame) {
              res.status(400).json({ message: "password not match" });
            } else {
              bcrypt.hash(payload.password, saltRounds, (err, hash) => {
                req.updateObj.password = hash;
                next()
              });
            }
          });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: `${err}` });
      });
  } else {
      next();
  }
};

exports.updateUserDetails = async (req, res, next) => {
  const {emailid} = req.body;
  try {
    let result = await userDb
      .updateOne({ emailid }, req.updateObj)
      .exec();
    res.status(200).json({ updated: true });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};