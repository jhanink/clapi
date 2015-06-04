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
      argsHelpStr = _arr.join(".");
      var _temp = this._findShallow(val, argsHelpStr);
      argsHelpStr = _temp.key;
      fs.writeFileSync(__dirname + '/../output/clapi_pasteboard', './clapi ' + argsHelpStr);
      temp = _temp.val;
    } else {
      temp = eval('val');
      fs.writeFileSync(__dirname + '/../output/clapi_pasteboard', './clapi ');
    }

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
          // TODO - accrue output information in an array of object for sorting purposes
          // and then serialize at the end

          // initialize
          var child = temp[i], objType = typeof(child),
              isPrimitive = objType === "string" || objType === "number" || objType === "boolean",
              isValueLeafNode = isPrimitive || child === null,
              isPlainObject = !isValueLeafNode && !isPrimitive && (child != null && typeof(child.length) === "undefined"),
              isArray = child instanceof Array,
          /*  no data-type  */
              linePrefix = "", prefixPadding = 0,
              prefixLength = linePrefix.length;

          if (checkEnv("CLAPI_SET_DATATYPE", "ON")) {
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
      return output;
    }
  },
  _findShallow: function (obj, partial) {
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
  },

  _getMatches: function (obj, searchTerm, state, args) {
    var searchResult = this._search (obj, searchTerm, "", []);

    var output = [];
    for (var i=0;i<searchResult.length;i++) {
      var path = searchResult[i];
      args.i = path;
      output.push (path)
    }
    var finalOutput = {}
    finalOutput["  SEARCH TERM  >  " + searchTerm] = output;
    return finalOutput;
  },

  // deep search matching for all keys and values matching 'term' starting at node 'obj'
  _search: function (obj, searchTerm, pathString, matchesArray) {

    var UTIL = {
      getObjectPath: function (pathString, prop) {
        return pathString === "" ? prop : pathString + "." + prop;
      },
      matchProperty: function (searchTerm, pathString, prop, matches) {
        if (prop.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0) {
          var propertyPath = this.getObjectPath(pathString, prop);
          matches.push(propertyPath);
          return true;
        }
        return false;
      }
    };

    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) continue;
      var child = obj[prop];
      var childTypeInfo = this._getTypeInfo(child);
      var propertyPath = UTIL.getObjectPath(pathString, prop);
      if (childTypeInfo.IS_ARRAY)
      {
        UTIL.matchProperty(searchTerm, pathString, prop, matchesArray);
        for (var i=0;i<child.length;i++) {
          this._search(child[i], searchTerm, propertyPath + "["+i+"]", matchesArray);
        }
      }
      else if (childTypeInfo.IS_PLAIN_OBJECT)
      {
        UTIL.matchProperty(searchTerm, pathString, prop, matchesArray);
        this._search(child, searchTerm, propertyPath, matchesArray);
      }
      else if (childTypeInfo.IS_PRIMITIVE)
      {
        UTIL.matchProperty(searchTerm, pathString, prop, matchesArray);
      }
    }
    return matchesArray;
  },
  _getTypeInfo: function (obj) {
    var type = typeof(obj);
    return {
      type: type,
      IS_PRIMITIVE: (type === "string" || type === "number" || type === "boolean"),
      IS_VALUE_LEAF_NODE: this.IS_PRIMITIVE || obj === null,
      IS_PLAIN_OBJECT: !this.IS_VALUE_LEAF_NODE && !this.IS_PRIMITIVE && (obj != null && typeof(obj.length) === "undefined"),
      IS_ARRAY: obj instanceof Array
    }
  }
};

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
