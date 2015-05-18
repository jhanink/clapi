var fs = require("fs");
var args = require("yargs").argv;
var prettyjson = require("prettyjson");

function printResult (state, contents) {
  if (state.args.RAW) {
    console.log(contents);
  } else if (state.args.JSON) {
    console.log(JSON.stringify(JSON.parse(contents), null, 2));
  } else {
    console.log(prettyjson.render(JSON.parse(contents)));
  }
}

if (args.DEBUG) {
  printResult({args: args}, JSON.stringify({"args": args}));return;
}

var state = {
  args: args
};
var file = args.file;

if (!file) {
  console.log("---> no file provided");
  return;
}

var contents = fs.readFileSync(file);

if (args.KEY) {
  var val = JSON.parse(contents);
  contents = eval('val.' + args.KEY);
  contents = JSON.stringify(contents);
}

printResult(state, contents);

