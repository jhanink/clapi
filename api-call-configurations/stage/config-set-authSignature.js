var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

var userHome = process.env['HOME'];
var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

module.exports = function (state) {
  var authSignature = state.args.authSignature;
  if (!authSignature) {
    console.log("---> missing authSignature");
    return;
  }

  config.customer.authSignature = authSignature;
  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
};
