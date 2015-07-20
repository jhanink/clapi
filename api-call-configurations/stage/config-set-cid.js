var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

module.exports = function (state) {
  var cid = state.args.cid;
  if (!cid) {
    console.log("---> missing cid");
    return;
  }

  config.customer.cid = cid;

  var userHome = process.env['HOME'];
  var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");
  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
};
