var prettyjson = require("prettyjson");
var request = require("request");


var makeRequest = function (options, data) {

  if (data) {
    options.body = JSON.stringify(data);
  }

  request(options, function (err, resp, body) {
    if (err) {console.log(err);return;}

    if (process.state.args.RAW) {
      console.log(body);
    } else if (process.state.args.JSON) {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } else {
      console.log(prettyjson.render(JSON.parse(body)));
    }
  });
};

module.exports = makeRequest;
