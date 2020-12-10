const userDb = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const saltRounds = 10;

exports.signup = (req, res, next) => {
  const createUser = async (res, body, hashedPassword) => {
    const {
      firstname,
      lastname,
      emailid,
      phonenumber,
      password,
      address,
    } = body;

    let newUser = await new userDb({
      firstname: firstname,
      lastname: lastname,
      emailid: emailid,
      phonenumber: phonenumber,
      password: hashedPassword,
      address: address,
    });

    newUser
      .save()
      .then((newUser) => {
        res.status(200).json({
          message: "User Created Successfully",
          user: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            emailid: newUser.emailid,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({ error: `${err}` });
      });
  };

  const { emailid, password } = req.body;

  userDb
    .find({ emailid: emailid })
    .then((userRes) => {
      if (userRes.length !== 0) {
        res.status(400).json({ message: "User Already Exists!!!" });
      } else {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          createUser(res, req.body, hashedPassword);
        });
      }
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
            const token = jwt.sign(
              { emailid: userRes.emailid, userid: userRes._id },
              process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
              }
            );

            res.status(200).json({
              message: "Logged in successfully!!!",
              token: token,
              user: {
                firstname: userRes.firstname,
                lastname: userRes.lastname,
                emailid: userRes.emailid,
              },
            });
          }
        });
      }
    }).catch(err=>{
      res.status(400).json({ error: `${err}` });
    });
};

exports.updateUser = async (req, res, next) => {
  const updatePassword = async (res, updateObj, emailid) => {
    console.log("updatePass", emailid, updateObj);
    try {
      let result = await userDb
        .updateOne({ emailid: emailid }, updateObj)
        .exec();
      res.status(200).json({ updated: true });
    } catch (err) {
      res.json({ error: err });
    }
  };

  const payload = req.body;
  let emailid = payload.emailid;
  let updateObj = {};
  payload.firstname ? (updateObj.firstname = payload.firstname) : null;
  payload.lastname ? (updateObj.lastname = payload.lastname) : null;
  payload.phonenumber ? (updateObj.phonenumber = payload.phonenumber) : null;
  payload.address ? (updateObj.address = payload.address) : null;
  payload.isAccountActive ? (updateObj.isAccountActive = payload.isAccountActive) : null;

  if (payload.oldPassword) {
    userDb
      .findOne({ emailid: emailid })
      .then((userRes) => {
        if (!userRes) {
          res.status(400).json({ message: "user not found" });
        }
        bcrypt.compare(payload.oldPassword, userRes.password, (err, isSame) => {
          if (!isSame) {
            res.status(400).json({ message: "password not match" });
          } else {
            bcrypt.hash(payload.password, saltRounds, (err, hash) => {
              updateObj.password = hash;
              updatePassword(res, updateObj, emailid);
            });
          }
        });
      })
      .catch((err) => {
        res.json({ error: "last" + err });
      });
  } else {
    try {
      let result = await userDb
        .update({ emailid: emailid }, updateObj, { multi: false })
        .exec();
      res.status(200).json({ updated: true });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
};
