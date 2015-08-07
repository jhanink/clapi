var fs = require("fs");
var path = require("path");
var args = require("yargs").argv;
var util = require("./clapi_modules/clapi-util");

var state = {
  args: args,
  baseDir: __dirname
};

var command_name = args.name;

if (!command_name) {
  console.log("---> no name provided");return;
}

if (util.isMocksMode()) {
  util.printMockOutput(state, command_name);
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

