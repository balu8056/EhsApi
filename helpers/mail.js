const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sqaud.hex@gmail.com",
    pass: "bsjveqnbfvdmucaw"
  },
});

module.exports = transporter;
