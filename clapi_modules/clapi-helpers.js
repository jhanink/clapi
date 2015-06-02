var fs = require("fs");
var prettyjson = require("prettyjson");
var stripAnsi = require("strip-ansi");


var getEnvVar = function (envKey) {
  return process.env[envKey];
};

var checkEnv = function (envKey, envVal) {
  return getEnvVar(envKey) === envVal;
};

module.exports = {
  printResult: function printResult (state, contents) {
    if (state.args.RAW) {
      console.log(JSON.stringify(JSON.parse(contents)));
    } else if (state.args.JSON) {
      console.log(JSON.stringify(JSON.parse(contents), null, 2));
    } else if (state.args.i && state.args.NOCOLOR) {
      var data = JSON.parse(contents);
      for (var temp in data) {
        if (data[temp].length) {
          for (var _data=0;_data<data[temp].length;_data++) {
            console.log(data[temp][_data]);
          }
        }
      }
    } else {
      var options = {};
      if (state.args.NODASH) {
        options.noDash = true;
      }
      console.log(prettyjson.render(JSON.parse(contents), options));
    }
  },
  getClapiFileContents: function (state) {

    var file = state.args.file || state.args.f;

    if (!file) {
      console.log("---> no file provided");
      return;
    }

    if (!fs.existsSync(file)) {
      this.printResult(state, JSON.stringify({
        "result": "file not found [" + file + "]"
      }));
      return;
    }

    return fs.readFileSync(file);
  },
  generateOutput: function (val, state, args) {
    var props = [];
    var temp = args.EVALHELP || args.HELP || args.i;
    var argsHelpStr = temp;
    var hasArgsValue = ! (typeof(temp) == "boolean" && temp);
    if (hasArgsValue) {
      var _arr = temp.split(".");
      for (var _s=0;_s<_arr.length;_s++) {
        var _part = _arr[_s];
        if (_part.indexOf("-") > -1) {
          _arr[_s] = _part.replace("-", " ").replace("[", "[\"").replace("]", "\"]")

        }
      }
      argsHelpStr = _arr.join(".")
      var _temp = this._find(val, argsHelpStr);
      argsHelpStr = _temp.key;
      fs.writeFileSync(__dirname + '/../output/clapi_pasteboard', './clapi ' + argsHelpStr);
      temp = _temp.val;
    } else {
      temp = eval('val');
      fs.writeFileSync(__dirname + '/../output/clapi_pasteboard', './clapi ');
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
      return JSON.stringify(temp)
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
          // TODO - acrrue output information in an array of object for sorting purposes
          // and then serialize at the end

          // initialize
          var child = temp[i], objType = typeof(child),
              isPrimitive = objType === "string" || objType === "number" || objType === "boolean",
              isValueLeafNode = isPrimitive || child === null,
              isPlainObject = !isValueLeafNode && (child != null && typeof(child.length) === "undefined"),
              isArray = !isValueLeafNode && !isPlainObject,
          /*  no data-type  */
              linePrefix = "", prefixPadding = 0,
              prefixLength = linePrefix.length;

          if (checkEnv("CLAPI_SHOW_DATATYPE", "ON")) {
            linePrefix = isArray?"array":objType;
            prefixPadding = 8;
            prefixLength = linePrefix.length;
          }

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
      return JSON.stringify(output);
    }
  },
  _find: function (obj, partial) {

    var match, firstPart, lastPart;

    try {
      match = eval('obj.' + partial);
      if (match) {
        return {key: partial, val: match};
      }
    } catch (e) {}


    var lastDot = partial.lastIndexOf(".");
    if (lastDot === -1) {
      lastPart = partial;
    } else {
      firstPart = partial.substring(0, lastDot);
      lastPart = partial.substring(lastDot+1);
      obj = eval('obj.'+firstPart);
    }
    for (var _i in obj) {
      if (!obj.hasOwnProperty(_i)) continue;
      if (_i.indexOf(lastPart) > -1) {
        return {key: firstPart+"."+_i, val:obj[_i]};
      }
    }
    return {key: partial, val:"NO MATCH FOUND for \""+partial+"\""};
  }
};
