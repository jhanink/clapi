var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

var userHome = process.env['HOME'];
var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

module.exports = function (state) {
  var args = state.args;

  if (args.cid) {
    config.customer.cid = args.cid;
  } else if (args.consumerId) {
    config.checkout.consumerId = args.consumerId;
  } else if (args.url) {
    config.checkout.purchaseContractEndpoint = args.url;
  } else if (args.serviceEnv) {
    config.checkout.serviceEnv = args.serviceEnv;
  } else if (args.authSignature) {
    config.checkout.authSignature = args.authSignature;
  }

  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
};
