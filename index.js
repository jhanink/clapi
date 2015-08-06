var fs = require("fs");
var path = require("path");
var args = require("yargs").argv;
var util = require("./clapi_modules/clapi-util");

var state = {
  args: args
};

var command_name = args.name;

if (!command_name) {
  console.log("---> no name provided");return;
}

if (util.isMocksMode()) {
  var mockFile = path.join(__dirname, "mocks", command_name + ".json");
  var mockBody = JSON.stringify(JSON.parse(fs.readFileSync(mockFile)));
  util.printOutput(state, null, {statusCode: 200}, mockBody);
  process.exit();
}

var envDirectory = (args.PROD) ? "prod" : "stage";
var envPath = path.join(__dirname, "api-call-configurations", envDirectory, command_name + ".js");

fs.stat(envPath, function (err, stats) {
  if (err) {
    console.log("---> no such (" + envDirectory + ") file for [" + command_name + "]");
  } else {
    require("./api-call-configurations/" + envDirectory)(state);
  }
});

