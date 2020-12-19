const multer = require("multer");

const storage = multer.diskStorage({
    destination: "assets/uploads/",
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },    
  });
  
const upload = multer({ storage: storage });

module.exports = upload;