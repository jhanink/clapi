var configDefault = require("./clapi-config-default");
var config = require("./clapi-config");

var result = configDefault;
for (var i in config) {
  if (config.hasOwnProperty(i)) {
    result[i] = configDefault[i];
  }
}

module.exports = result;