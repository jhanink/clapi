var fs = require("fs");
var path = require("path");
var config = require("../include/clapi-config");

var userHome = process.env['HOME'];
var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

module.exports = function (state) {
  var args = state.args;

  if (args.cid) {
    config.customer.cid = args.cid;
  }  else if (args.caEndpointUrl) {
    config.customer.caEndpointUrl = args.caEndpointUrl;
  } else if (args.consumerId) {
    config.checkout.consumerId = args.consumerId;
  } else if (args.pcEndpointUrl) {
    config.checkout.purchaseContractEndpoint = args.pcEndpointUrl;
  } else if (args.serviceEnv) {
    config.checkout.serviceEnv = args.serviceEnv;
  } else if (args.authSignature) {
    config.checkout.authSignature = args.authSignature;
  } else if (args.tenantId) {
    config.general.tenantId = args.tenantId;
  } else if (args.verticalId) {
    config.general.verticalId = args.verticalId;
  } else if (args.localeId) {
    config.general.localeId = args.localeId;
  } else if (args.correlationId) {
    config.general.correlationId = args.correlationId;
  }

  if (args.showConfig) {
    console.log(config);
  } else {
    config.configVersion = config.configVersion + 1;
    config.configVersionDate = new Date().toString();
    fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(config));
  }

};
