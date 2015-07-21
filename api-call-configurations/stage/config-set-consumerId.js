var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

var userHome = process.env['HOME'];
var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

module.exports = function (state) {
  var consumerId = state.args.consumerId;
  if (!consumerId) {
    console.log("---> missing consumerId");
    return;
  }

  config.checkout.consumerId = consumerId;
  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
};
