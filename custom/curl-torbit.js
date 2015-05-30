var args = require("yargs").argv;
var lineReader = require("line-reader");

var state = {
  args: args
};

var file = state.args.file;

if (!file) {
  console.log("---> missing file");return;
}

var output = {};
lineReader.eachLine(file, function (line, last) {
  var parts = line.split(":");
  if (parts.length === 2) {
    output[parts[0].trim()] = parts[1].trim();
  } else if (line.indexOf("HTTP/") > -1) {
    output["status"] = parts[0];
  }
}).then (function() {
  console.log(JSON.stringify(output));
});
