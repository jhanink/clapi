var config = require("./clapi-config-default");
var deepExtend = require('deep-extend');

var fs = require("fs");
var path = require("path");
var userHome = process.env['HOME'];

var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");

var configUser;

try {
  stats = fs.lstatSync(clapiUserConfigFilePath);
  if (stats.isFile()) {
    configUser = fs.readFileSync(clapiUserConfigFilePath, 'utf8');
    configUser = JSON.parse(configUser);
    deepExtend(config, configUser);
  }
} catch (e) {}

module.exports = config;