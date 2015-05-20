var prettyjson = require("prettyjson");
var request = require("request");

var makeRequest = function (options, data, state) {
  if (data) {
    options.body = JSON.stringify(data);
  }

  request(options, function (err, resp, body) {
    _printOutput(state, err, resp, body);
  });
};

var _printOutput = function (state, err, resp, body) {
  var wrappedResult = {};

  if (err) {
    wrappedResult.status = "FAILURE";
    wrappedResult.body = err;
    console.log(wrappedResult);
    return;
  }



  if (state.args.WRAP) {
    wrappedResult = {
      status: Math.floor(resp.statusCode/100) === 2 ? "SUCCESS" : "FAILURE",
      body: body
    };
    console.log(JSON.stringify(wrappedResult));
    return;
  }

  if (state.args.RAW) {
    console.log(body);
  } else if (state.args.JSON) {
    console.log(JSON.stringify(JSON.parse(body), null, 2));
  } else {
    console.log(prettyjson.render(JSON.parse(body)));
  }
};

module.exports = makeRequest;
