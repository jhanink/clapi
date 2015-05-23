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

function echo (msg, val) {
  if (!val) {
    console.log(msg);
  } else {
    console.log(msg, val);
  }
}

function echoEnd(msg, val) {
  echo (msg, val);
  process.exit();
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

var val = JSON.parse(contents);
var obj = val;

var dasfunctions = require("./api-call-configurations/include/dasfunctions")(val);

if (args.FUNC) {
  try {
    var fn = eval(dasfunctions[args.FUNC]);
    if (typeof(fn) !== "function") {
      throw new Error(args.FUNC + " is not a function");
    }
    contents = JSON.stringify(fn());
  } catch (e) {
    contents = JSON.stringify({
      "result" : "error",
      "description" : e.message
    });
  }
}
else if (args.EVAL) {
  contents = eval('val.' + args.EVAL);
  contents = JSON.stringify(contents);
}
else if (args.EXPR) {
  contents = eval(args.EXPR);
  contents = JSON.stringify(contents);
}

printResult(state, contents);

