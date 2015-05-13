var fs = require("fs");
var path = require("path");
var args = require("yargs").argv;

process.state = {
  args: args,
  isHttps: true
};

var command_name = args.name;

if (!command_name) {
  console.log("---> no name provided");
  return;
}

var subdir = (args.PROD)? "prod" : "stage";

fs.stat(path.join(__dirname,"api-call-configurations", subdir,  command_name + ".js"), function (err, stats) {
  if (err) {
    console.log("---> no such STAGE file for [" + command_name + "]");
  } else {
    require("./api-call-configurations/" + subdir)();
  }
});






