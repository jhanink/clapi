var fs = require("fs");
var prettyjson = require("prettyjson");
var stripAnsi = require("strip-ansi");

var CONST = {
  ENV : {
    SET_DATATYPE: "CLAPI_SET_DATATYPE"
  }
};

var Util = {
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
  },
  getTypeInfo: function (obj) {
    var type = typeof(obj);
    return {
      TYPE: type,
      IS_PRIMITIVE: (type === "string" || type === "number" || type === "boolean"),
      IS_VALUE_LEAF_NODE: this.IS_PRIMITIVE || obj === null,
      IS_PLAIN_OBJECT: !this.IS_VALUE_LEAF_NODE && !this.IS_PRIMITIVE
        && (obj != null && typeof(obj.length) === "undefined"),
      IS_ARRAY: obj instanceof Array
    }
  },
  getFileContents: function (state) {
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
  findShallow: function (obj, partial) {
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
  getFormattedLineOutput: function (child, prop, args, idx) {
    var objInfo = Util.getTypeInfo(child);
    var prefix = {line: "", padding: 0, length: 0};
    if (Util.getEnvVar(CONST.ENV.SET_DATATYPE) === "ON") {
      prefix.line = objInfo.IS_ARRAY?"array":objInfo.TYPE;
      prefix.padding = 8;
      prefix.length = prefix.line.length;
    }
    for (var _pad=0;_pad<(prefix.padding-prefix.length);_pad++) {prefix.line += " "}
    prefix.line = idx+(idx<10?"   ":"  ") + prefix.line;
    var str = "\033[1;30m" + prefix.line + " \033[0m" ;
    if (objInfo.IS_VALUE_LEAF_NODE)
    {
      str += "\033[0;34m";
      str += prop + "\033[0m" + "\033[0;37m — " + child + "\033[0m";
    }
    else
    {
      var propCount = 0;
      if (objInfo.IS_PLAIN_OBJECT) {
        for (var _p in child) {if (child.hasOwnProperty(_p)) {propCount++;}}
      } else {
        propCount = child.length;
      }
      str += propCount ? "\033[0;34m" : "\033[1;30m";
      var toPluralize = propCount === 0 || propCount > 1;
      str += prop + "" + (propCount ? "\033[1;30m "+(objInfo.IS_ARRAY?"··":"○—○")+" "+propCount+(objInfo.IS_ARRAY?" element":" node")+(toPluralize?"s":"")+"\033[0m" : " \\");
      str += "\033[0m";
    }
    if (args.NOCOLOR) {
      str = stripAnsi(str);
    }
    return str;
  },
  getEnvVar: function (envKey) {
    return process.env[envKey];
  }
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
      var _temp = Util.findShallow(val, argsHelpStr);
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
      for (var prop in temp) {
        if (!temp.hasOwnProperty(prop)) continue;
        idx++;
        if (args.JSON)
        {
          props.push(prop);
        }
        else
        {
          var child = temp[prop];
          var str = Util.getFormattedLineOutput(child, prop, args, idx);
          props.push (str)
        }
      }
      var output = {};
      var outputKey = "" + (hasArgsValue ? "\033[0;33m "+argsHelpStr+"\033[0m" : ":");
      output[outputKey] = props;
      return output;
    }
  },
  getMatches: function (obj, searchTerm, state, args) {
    var searchResult = this.search (obj, searchTerm, "", []);

    var output = [];
    for (var i=0;i<searchResult.length;i++) {
      var path = searchResult[i];
      args.i = path;
      var child = eval('obj.'+path);
      var str = Util.getFormattedLineOutput(child, path, args, i+1);
      output.push(str);
    }
    var finalOutput = {}
    finalOutput[" (search term) > " + searchTerm] = output;
    return finalOutput;
  },

  // deep search matching for all keys and values matching 'term' starting at node 'obj'
  search: function (obj, searchTerm, pathString, matchesArray) {
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) continue;
      var child = obj[prop];
      var childTypeInfo = Util.getTypeInfo(child);
      var propertyPath = Util.getObjectPath(pathString, prop);
      if (childTypeInfo.IS_ARRAY)
      {
        Util.matchProperty(searchTerm, pathString, prop, matchesArray);
        for (var i=0;i<child.length;i++) {
          this.search(child[i], searchTerm, propertyPath + "["+i+"]", matchesArray);
        }
      }
      else if (childTypeInfo.IS_PLAIN_OBJECT)
      {
        Util.matchProperty(searchTerm, pathString, prop, matchesArray);
        this.search(child, searchTerm, propertyPath, matchesArray);
      }
      else if (childTypeInfo.IS_PRIMITIVE)
      {
        Util.matchProperty(searchTerm, pathString, prop, matchesArray);
      }
    }
    return matchesArray;
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
