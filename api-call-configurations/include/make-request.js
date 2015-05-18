var prettyjson = require("prettyjson");
var request = require("request");

var makeRequest = function (options, data, state) {
  if (data) {
    options.body = JSON.stringify(data);
  }

  request(options, function (err, resp, body) {
    _printOutput(state, err, body);
  });
};

var _printOutput = function (state, err, body) {
  if (err) {console.log(err);return;}

  if (state.args.RAW) {
    console.log(body);
  } else if (state.args.JSON) {
    console.log(JSON.stringify(JSON.parse(body), null, 2));
  } else {
    console.log(prettyjson.render(JSON.parse(body)));
  }
}

module.exports = makeRequest;
