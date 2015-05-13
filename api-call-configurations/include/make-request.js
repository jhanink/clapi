var proto; // http | https
var prettyjson = require("prettyjson");


var makeRequest = function (options, data) {

  // --- process optional data
  if (data) {
    data = JSON.stringify(data);
    options["Content-Length"] = data.length;
  }

  // --- http or https
  proto = process.state.isHttps || options.port === 443
      ? require("https") : require("http");

  // --- setup request
  var req = proto.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      if (process.state.args.RAW) {
        console.log(responseString);
      } else if (process.state.args.JSON) {
        console.log(JSON.stringify(JSON.parse(responseString), null, 2));
      } else {
        console.log(prettyjson.render(JSON.parse(responseString)));
      }
    });
  });

  // --- log errors
  req.on('error', function(e) {
    console.log(e);
  });

  // --- pass data if any
  if (data) {
    req.write(data);
  }
  // --- finish
  req.end();

};

module.exports = makeRequest;
