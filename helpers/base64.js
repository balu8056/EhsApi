const fs = require("fs");

module.exports = function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString("base64");
}