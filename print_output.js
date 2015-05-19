var fs = require("fs");
var args = require("yargs").argv;
var prettyjson = require("prettyjson");

function printResult (state, contents) {
  if (state.args.RAW) {
    console.log(JSON.stringify(JSON.parse(contents)));
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

if (!fs.existsSync(file)) {
  printResult(state, JSON.stringify({
    "result": "No Error file was found"
  }));
  return;
}

var contents = fs.readFileSync(file);

if (args.EVAL) {
  var val = JSON.parse(contents);
  contents = eval('val.' + args.EVAL);
  contents = JSON.stringify(contents);
}

printResult(state, contents);

