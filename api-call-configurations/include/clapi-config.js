let configDefault = require("./clapi-config-default");
let config = require("./clapi-config");

var result = configDefault;
for (let i in config) {
  if (config.hasOwnProperty(i)) {
    result[i] = configDefault[i];
  }
}

module.exports = result;