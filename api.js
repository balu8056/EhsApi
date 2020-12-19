require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const poster = require("./routes/poster");
const material = require("./routes/material");
const category = require("./routes/category");
const subCategory = require("./routes/subCategory");
const auth = require("./routes/auth");
const orders = require("./routes/orders");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/posters", poster);
app.use("/material", material);
app.use("/category", category);
app.use("/subCategory", subCategory);
app.use("/auth", auth);
app.use("/orders", orders);

app.get("/", (req, res) => {
  res.status(200).json({message: "hellooo!!!"});
});

mongoose
  .connect(
    "mongodb+srv://balu:mongopassword@cluster0.6ujrr.mongodb.net/example?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 8080, () =>
      console.log("Server started!!!")
    );
  })
  .catch((err) => {
    console.log(err);
  });
