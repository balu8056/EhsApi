const userDb = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/mail");
require("dotenv").config();

const saltRounds = 10;

exports.getUsers = (req, res, next) => {
  userDb
    .find(
      {},
      "_id firstname lastname emailid phonenumber address isAccountActive isActive"
    )
    .then((users) => {
      res.status(200).json({ message: "Successfully loaded!!!", users: users });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.getUserById = (req, res, next) => {
  const authId = req.params.authId;

  try {
    userDb
      .findOne(
        { _id: authId },
        "_id firstname lastname emailid phonenumber address isAccountActive isActive"
      )
      .then((users) => {
        if (!users) res.status(404).json({ message: "user not found!!!" });
        res
          .status(200)
          .json({ message: "Successfully loaded!!!", users: users });
      })
      .catch((err) => {
        res.status(400).json({ error: `${err}` });
      });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

exports.checkAlreadyUserExist = (req, res, next) => {
  const { emailid } = req.body;

  userDb
    .findOne({ emailid })
    .then((userRes) => {
      if (userRes) res.status(400).json({ message: "User Already Exists!!!" });
      else next();
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.signup = async (req, res, next) => {
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
    address,
  });

  newUser
    .save()
    .then((user) => {
      const token = jwt.sign(
        { emailid: user.emailid, userid: user._id },
        `${process.env.SECRET}` || "NaveenKmrBala",
        { expiresIn: 300 }
      );
      const link = `localhost/auth/activate/${token}`;
      let mailOptions = {
        from: "sqaud.hex@gmail.com",
        to: user.emailid,
        subject: "EHS prints",
        html: `<a href=${link}>click to activate account</a>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(400).json({ error: `${err}` });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({
            message: "User Created Successfully and click the link that we have sent to your mail!!!",
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              emailid: user.emailid,
            },
          });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.activateAccount = (req, res, next) => {
  const token = req.params.token;

  let deauthtoken;
  try { deauthtoken = jwt.verify(token, `${process.env.SECRET}`|| "NaveenKmrBala");
  } catch (err) {}

  if (!deauthtoken) {res.status(400).json({ message: "invalid token!!!" });}
  let userid = deauthtoken.userid;

  userDb
    .findOne({ _id: userid })
    .then((users) => {
      if (!users) res.status(404).json({ message: "user not found!!!" });
      else {
        if (users.isAccountActive)
          res.status(404).json({ message: "User Already Activated!!!" });
        else {
          users.isAccountActive = true;
          users.save(err=>{
            if (err) {res.status(400).json({ error: `${err}` });}
            else{ res.status(200).json({ message: "Account activated" });}
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.login = (req, res, next) => {
  const { emailid, password } = req.body;
  userDb
    .findOne({ emailid: emailid, isActive: true })
    .populate("cart.itemDetails", "_id name imgUrl originalPrice")
    .then((userRes) => {
      if (!userRes) {
        res.status(400).json({ message: "user not found!!!" });
      } else {
        if (!userRes.isAccountActive) {
          res.status(400).json({ message: "Account is not activated!!!" });
        } else {
          bcrypt.compare(password, userRes.password, (err, isSame) => {
            if (!isSame) {
              res.status(400).json({ message: "password doesn't match!!!" });
            } else {
              const token = jwt.sign(
                { emailid: userRes.emailid, userid: userRes._id },
                `${process.env.SECRET}` || "NaveenKmrBala",
                { expiresIn: 86400 }
              );

              res.status(200).json({
                message: "Logged in successfully!!!",
                token: token,
                user: {
                  userid: userRes.userid,
                  firstname: userRes.firstname,
                  lastname: userRes.lastname,
                  emailid: userRes.emailid,
                  cart: userRes.cart,
                },
              });
            }
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.getUpdateUserDetails = (req, res, next) => {
  req.updateObj = {};

  const payload = req.body;
  const { emailid } = req.body;

  payload.firstname ? (req.updateObj.firstname = payload.firstname) : null;
  payload.lastname ? (req.updateObj.lastname = payload.lastname) : null;
  payload.phonenumber
    ? (req.updateObj.phonenumber = payload.phonenumber)
    : null;
  payload.address ? (req.updateObj.address = payload.address) : null;
  payload.isAccountActive
    ? (req.updateObj.isAccountActive = payload.isAccountActive)
    : null;
  payload.cart ? (req.updateObj.cart = payload.cart) : null;
  payload.wishList ? (req.updateObj.wishList = payload.wishList) : null;

  if (payload.oldpassword) {
    userDb
      .findOne({ emailid })
      .then((userRes) => {
        if (!userRes) {
          res.status(400).json({ message: "user not found" });
        } else {
          bcrypt.compare(
            payload.oldpassword,
            userRes.password,
            (err, isSame) => {
              if (!isSame) {
                res.status(400).json({ message: "password not match" });
              } else {
                bcrypt.hash(payload.password, saltRounds, (err, hash) => {
                  req.updateObj.password = hash;
                  next();
                });
              }
            }
          );
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
  const { emailid } = req.body;
  try {
    let result = await userDb.updateOne({ emailid }, req.updateObj).exec();
    res.status(200).json({ updated: true });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};
