if (process.env.NODE_ENV === "production") {
  module.exports = require("./dev");
} else {
  //we are in dev, return dev keys
  //Encryption
  module.exports = require("./prod");
}
