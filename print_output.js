var fs = require("fs");
var args = require("yargs").argv;
var prettyjson = require("prettyjson");
var stripAnsi = require("strip-ansi");

function printResult (state, contents) {
  if (state.args.RAW) {
    console.log(JSON.stringify(JSON.parse(contents)));
  } else if (state.args.JSON) {
    console.log(JSON.stringify(JSON.parse(contents), null, 2));
  } else if (state.args.HELP && state.args.NOCOLOR) {
    var data = JSON.parse(contents);
    for (var temp in data) {
      if (data[temp].length) {
        for (var _data=0;_data<data[temp].length;_data++) {
          console.log(data[temp][_data]);
        }
      }
    }

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
var file = args.file || args.f;

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
else if (args.EVALHELP || args.HELP || args.i) {
  var props = [];
  var temp = args.EVALHELP || args.HELP || args.i;
  var argsHelp = temp;
  var argsHelpStr = argsHelp;
  var hasArgsValue = ! (typeof(temp) == "boolean" && temp);
  if (hasArgsValue) {
    var _arr = temp.split(".");
    for (var _s=0;_s<_arr.length;_s++) {
      var _part = _arr[_s];
      if (_part.indexOf("-") > -1) {
        _arr[_s] = _part.replace("-", " ").replace("[", "[\"").replace("]", "\"]")

      }
    }
    var argsHelpStr = _arr.join(".")
    temp = eval('val.' + argsHelpStr);
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

                     ○ • ■ · —

   */

  // IS leaf node
  if (typeof(temp) === "string" || typeof(temp) === "number" || typeof(temp) === "boolean")
  {
    contents = JSON.stringify(temp)
  }
  // NOT leaf node
  else
  {
    // inspect the properties
    var idx = 0;
    for (var i in temp) {
      if (!temp.hasOwnProperty(i)) continue;
      idx++;
      if (args.JSON)
      {
        props.push(i);
      }
      else
      {
        // initialize
        var child = temp[i], objType = typeof(child),
            isPrimitive = objType === "string" || objType === "number" || objType === "boolean",
            isValueLeafNode = isPrimitive,
            isPlainObject = !isPrimitive && typeof(child.length) === "undefined",
            isArray = !isPrimitive && !isPlainObject,

            /*  show data-type  */
            // linePrefix = isArray?"array":objType, prefixPadding = 8,

            /*  no data-type  */
            linePrefix = "", prefixPadding = 0,

            prefixLength = linePrefix.length;

        // prefix padding
        for (var _pad=0;_pad<(prefixPadding-prefixLength);_pad++) {linePrefix += " "}
        linePrefix = idx+(idx<10?"   ":"  ")+linePrefix;

        // prepare output
        var str = "\033[1;30m" + linePrefix + " \033[0m" ;

        if (isValueLeafNode)
        {
          str += "\033[0;34m";
          str += i + "\033[0m" + "\033[0;37m — " + child + "\033[0m";
        }
        else
        {
          var propCount = 0;
          if (isPlainObject) {
            for (var _p in child) {if (child.hasOwnProperty(_p)) {propCount++;}}
          } else {
            propCount = child.length;
          }
          str += propCount ? "\033[0;34m" : "\033[1;30m";
          var toPluralize = propCount === 0 || propCount > 1;
          str += i + "" + (propCount ? "\033[1;30m "+(isArray?"··":"○—○")+" "+propCount+(isArray?" element":" node")+(toPluralize?"s":"")+"\033[0m" : " \\");

          str += "\033[0m";
        }
        if (args.NOCOLOR) {
          str = stripAnsi(str);
        }
        props.push (str)
      }
    }
    var output = {};
    var outputKey = "" + (hasArgsValue ? "\033[0;33m "+argsHelpStr+"\033[0m" : ":");
    output[outputKey] = props;
    contents = JSON.stringify(output);
  }
}

printResult(state, contents);

