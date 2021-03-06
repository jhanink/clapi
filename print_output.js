var fs = require("fs");
var args = require("yargs").argv;
var clapi = require("./clapi_modules/clapi-helpers");

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
  clapi.printResult({args: args}, JSON.stringify({"args": args})); process.exit(0);
}

var state = {
  args: args
};

var file = args.file || args.f;

if (!file) {
  console.log("---> no file provided");
  process.exit(0);
}

if (!fs.existsSync(file)) {
  clapi.printResult(state, JSON.stringify({
    "result": "file not found [" + file + "]"
  }));
  process.exit(0);
}

var contents = fs.readFileSync(file);

var val = JSON.parse(contents);
var obj = val;
var dasfunctions;

if (args.FUNC) {
  if (args.CLAPI_TEMP) {
    dasfunctions = require("./clapi_modules/clapi-temp")(val);
  } else {
    dasfunctions = require("./api-call-configurations/include/dasfunctions")(val);
  }
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
else if (args.EVAL)
{
  contents = eval('val.' + args.EVAL);
  contents = JSON.stringify(contents);
}
else if (args.EXPR)
{
  contents = eval(args.EXPR);
  contents = JSON.stringify(contents);
}
else if (args.EVALHELP || args.HELP || args.i)
{
  if (args.FIND) {
    if (args.i && typeof(args.i) !== "boolean") {
      contents = JSON.stringify(clapi.getMatches(obj, args.i, state, args));
    } else {
      contents = JSON.stringify(clapi.generateOutput(obj, state, args));
    }
  } else {
    contents = JSON.stringify(clapi.generateOutput(obj, state, args));
  }
}

clapi.printResult(state, contents);

