const multer = require("multer");

// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");

// const s3 = new aws.S3({ /* ... */ })

// module.exports = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'some-bucket',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, `${file.fieldname}-${Date.now()}.jpg`);
//     }
//   });
// });


const storage = multer.diskStorage({
  destination: "assets/uploads/",
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: storage});

module.exports = upload;
