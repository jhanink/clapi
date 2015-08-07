var prettyjson = require("prettyjson");
var request = require("request");
var util = require("../../clapi_modules/clapi-util");

var makeRequest = function (options, data, state) {
  if (data) {
    options.body = JSON.stringify(data);
  }

  if (util.isMocksMode()) {
    util.handleMockApiCall(state, state.args.name);
    return;
  }

  request(options, function (err, resp, body) {
    if(state.callback) {
      state.callback(err?err:body);
      return;
    }
    util.printOutput(state, err, resp, body);
  });
};

module.exports = makeRequest;
