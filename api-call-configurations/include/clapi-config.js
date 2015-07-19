var config = require("./clapi-config-default");

var fs = require("fs");
var path = require("path");
var userHome = process.env['HOME'];

var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

try {
  stats = fs.lstatSync(clapiUserConfigFilePath);
  if (stats.isFile()) {
    userConfig = fs.readFileSync(clapiUserConfigFilePath, 'utf8');
    userConfig = JSON.parse(userConfig);
    config.customer.cid = userConfig.customer.cid;
  }
} catch (e) {}

module.exports = config;