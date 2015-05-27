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
    "result": "file not found [" + file + "]"
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
else if (args.EVALHELP || args.HELP || args.I) {
  var props = [];
  var temp = args.EVALHELP || args.HELP || args.I;
  var argsHelp = temp;
  var hasArgsValue = ! (typeof(temp) == "boolean" && temp);
  if (hasArgsValue) {
    temp = eval('val.' + temp);
  } else {
    temp = eval('val');
  }

  /*

   Black        0;30     Dark Gray     1;30
   Blue         0;34     Light Blue    1;34
   Green        0;32     Light Green   1;32
   Cyan         0;36     Light Cyan    1;36
   Red          0;31     Light Red     1;31
   Purple       0;35     Light Purple  1;35
   Brown/Orange 0;33     Yellow        1;33
   Light Gray   0;37     White         1;37

   */

  if (typeof(temp) === "string" || typeof(temp) === "number" || typeof(temp) === "boolean") {
    contents = JSON.stringify(temp)
  } else {
    for (var i in temp) {
      if (args.JSON) {
        props.push(i);
      } else {
        var child = temp[i];
        if (typeof(child) === "string" || typeof(child) === "number" || typeof(child) === "boolean") {
          props.push("\033[0;34m" + i + "\033[0m" + " - \033[0;33m" + child + "\033[0m");
        } else {
          var str = "";
          if (typeof(child.length) === "undefined") {
            str = "\033[0;37m";
            str += i + " {}";
          } else {
            str = child.length ? "\033[0;37m" : "\033[1;30m";
            str += i + " " + (child.length ? child.length : "EMPTY");
          }
          str += "\033[0m";
          props.push(str);
        }
      }
    }
    var output = {};
    var outputKey = "" + (hasArgsValue ? argsHelp.toUpperCase() : ":");
    output[outputKey] = props
    contents = JSON.stringify(output);
  }
}

printResult(state, contents);

