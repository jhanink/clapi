var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

var userHome = process.env['HOME'];
var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

module.exports = function (state) {
  var url = state.args.url;
  if (!url) {
    console.log("---> missing purchase contract endpoint url");
    return;
  }

  config.purchaseContractEndpoint = url;
  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
};
