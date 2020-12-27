const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sqaud.hex@gmail.com",
    pass: "bsjveqnbfvdmucaw",
  },
});

module.exports = transporter;
