var fs = require("fs");
var args = require("yargs").argv;
var prettyjson = require("prettyjson");

var state = {
  args: args
};

var file = args.file;

if (!file) {
  console.log("---> no file provided");return;
}

var contents = fs.readFileSync(file);

if (state.args.RAW) {
  console.log(contents);
} else if (state.args.JSON) {
  console.log(JSON.stringify(JSON.parse(contents), null, 2));
} else {
  console.log(prettyjson.render(JSON.parse(contents)));
}
