var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

var userHome = process.env['HOME'];
var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

module.exports = function (state) {
  var serviceEnv = state.args.serviceEnv;
  if (!serviceEnv) {
    console.log("---> missing serviceEnv");
    return;
  }

  config.checkout.serviceEnv = serviceEnv;
  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
};
