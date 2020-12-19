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
// const multer = require("multer");
var fs = require("fs");

const app = express();

// app.set("view engine", "ejs");
// app.set("views", "views");

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

// const storage = multer.diskStorage({
//   destination: "assets/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//   },
// });
// const upload = multer({ storage: storage });

// const schema = mongoose.Schema;
// const img = new schema({
//   name: {
//     type: String,
//   },
//   imgUrl: {
//     data: Buffer,
//     contentType: String,
//   },
// });

// const imgModel = mongoose.model("Image", img);

// app.get("/", (req, res) => {
//   imgModel
//     .find({})
//     .then((images) => {
//       res.render("index.ejs", { items: images });
//     })
//     .catch((err) => {
//       res.status(400).json({ error: `${err}` });
//     });
// });

// function base64_encode(file) {
//   var bitmap = fs.readFileSync(file);
//   return new Buffer(bitmap).toString("base64");
// }

// app.post("/", upload.single("imgUrl"), (req, res, next) => {
//   console.log("req file", req.file);

//   var imageAsBase64 = base64_encode(req.file.path);

//   let newImg = new imgModel({
//     name: req.file.filename,
//     imgUrl: {
//       data: imageAsBase64,
//       contentType: "image/png",
//     },
//   });

//   newImg
//     .save()
//     .then((savedImg) => {
//       if (savedImg) {
//         try { fs.unlinkSync(req.file.path);
//         } catch(err) { console.error(err);}
//         res.status(200).json({ message: savedImg });
//       }
//       else res.status(200).json({ message: "no img" });
//     })
//     .catch((err) => {
//       res.status(400).json({ error: `${err}` });
//     });
// });

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
