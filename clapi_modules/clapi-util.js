var fs = require("fs");
var path = require("path");
var prettyjson = require("prettyjson");
var stripAnsi = require("strip-ansi");
var Const = require("./clapi-constants");
var clapi = require("../clapi_modules/clapi-helpers");

module.exports = {
  getObjectPath: function (pathString, prop) {
    if (typeof prop === 'number') {
      return pathString + `[${prop}]`;
    }
    return pathString === "" ? prop : pathString + "." + prop;
  },
  canMatch: function(childTypeInfo) {
    return childTypeInfo.IS_ARRAY || childTypeInfo.IS_PLAIN_OBJECT ||
      childTypeInfo.IS_PRIMITIVE || childTypeInfo.IS_VALUE_LEAF_NODE;
  },
  match: function(obj, searchTerm, pathString, prop, matches, args) {
    if (args.VALUE) { // match by value
      this.matchValue(obj, searchTerm, pathString, prop, matches);
    } else if (args.KEYVALUE) { // match by value
      this.matchKeyValue(obj, searchTerm, args['_'][0], pathString, prop, matches);
    } else if (args.PATHVALUE) { // match by value
      this.matchPathValue(obj, searchTerm, args['_'][0], pathString, prop, matches);
    } else { // match by key
      this.matchProperty(searchTerm, pathString, prop, matches);
    }
  },
  matchProperty: function (searchTerm, pathString, prop, matches) {
    if (prop.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      var propertyPath = this.getObjectPath(pathString, prop);
      matches.push(propertyPath);
      return true;
    }
    return false;
  },
  matchKeyValue: function (obj, key, searchTerm, pathString, prop, matches) {
    if (prop.toLowerCase().indexOf(key.toLowerCase()) > -1) {
      var propertyPath = this.getObjectPath(pathString, prop);
      this.matchValue(obj, searchTerm, pathString, prop, matches);
    }
  },
  matchPathValue: function (obj, pathValue, searchTerm, pathString, prop, matches) {
    var propertyPath = this.getObjectPath(pathString, prop);
    // convert the shorthand '..' -> regex '.*'
    var _pathValue = pathValue.replace(/\.\./g, '.*')
    if (!searchTerm) {
      searchTerm = '.';
    }
    if (propertyPath.match(_pathValue.toLowerCase())) {
      this.matchValue(obj, searchTerm, pathString, prop, matches);
    }
  },
  matchValue: function (obj, searchTerm, pathString, prop, matches) {
    var propertyPath = this.getObjectPath(pathString, prop);
    if (searchTerm === '.') {
        matches.push(propertyPath);
        return true;
    };
    var val = obj[prop];
    var result = false;
    if (val !== undefined) {
      var typeInfo = this.getTypeInfo(val);
      if (typeInfo.TYPE === 'string' && val.toLowerCase().indexOf(new String(searchTerm).toLowerCase()) > -1) {
        result = true;
      } else if (typeInfo.IS_PRIMITIVE && new String(val) == searchTerm) {
        result = true;
      } else if (val == null && searchTerm === 'null') {
        result = true;
      }
      if (result === true) {
        matches.push(propertyPath);
      }
      return result;
    }
    if (val && obj[prop].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      matches.push(propertyPath);
      return true;
    }
    return false;
  },
  getTypeInfo: function (obj) {
    var type = typeof(obj);
    var isPrimitive = (type === "string" || type === "number" || type === "boolean");
    var isLeafNode = isPrimitive || obj === null;
    return {
      TYPE: type,
      IS_PRIMITIVE: isPrimitive,
      IS_BOOLEAN: (type === "boolean"),
      IS_VALUE_LEAF_NODE: isLeafNode,
      IS_PLAIN_OBJECT: !isLeafNode && !isPrimitive && (obj != null && typeof(obj.length) === "undefined"),
      IS_ARRAY: obj instanceof Array,
      IS_NULL: obj === null,
    }
  },
  getFileContents: function (state) {
    var file = state.args.file || state.args.f;
    if (!file) {
      console.log("---> no file provided");
      return;
    }
    if (!fs.existsSync(file)) {
      clapi.printResult(state, JSON.stringify({
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

    var objInfo = this.getTypeInfo(child);
    var prefix = {line: "", padding: 0, length: 0};
    if (this.getEnvVar(Const.ENV.SET_DATATYPE) === "ON") {
      prefix.line = objInfo.IS_ARRAY?"ARRAY":objInfo.TYPE.toUpperCase();
      prefix.padding = 8;
      prefix.length = prefix.line.length;
    }
    for (var _pad=0;_pad<(prefix.padding-prefix.length);_pad++) {prefix.line += " "}
    prefix.line = idx+(idx<10?"   ":"  ") + prefix.line;
    var str = Const.COLORS.RED + prefix.line + " "+ Const.COLORS.CLEAR ;

    if (objInfo.IS_VALUE_LEAF_NODE)
    {
      str += "" + Const.COLORS.BLUE + prop + Const.COLORS.CLEAR;
      str += Const.COLORS.LIGHT_GREEN +" — " + child + Const.COLORS.CLEAR;
    }
    else
    {
      var propCount = 0;
      if (objInfo.IS_PLAIN_OBJECT) {
        for (var _p in child) {if (child.hasOwnProperty(_p)) {propCount++;}}
      } else {
        propCount = child.length;
      }
      str += propCount ? Const.COLORS.BLUE : Const.COLORS.RED;
      var toPluralize = propCount === 0 || propCount > 1;
      str += (propCount?(objInfo.IS_ARRAY?"":""):"") + prop + "" + (propCount ? Const.COLORS.RED + " "+(objInfo.IS_ARRAY?"·":"·")+" "
          + propCount
          + (objInfo.IS_ARRAY?" element":" node")
          + (toPluralize?"s":"")
          + Const.COLORS.CLEAR : " \\");
      str += Const.COLORS.CLEAR;
    }
    if (args.NOCOLOR) {
      str = stripAnsi(str);
    }
    return str;
  },
  getEnvVar: function (envKey) {
    return process.env[envKey];
  },
  isMocksMode: function() {
    return this.getEnvVar(Const.ENV.SET_MOCKS) === "ON";
  },
  printMockOutput: function (state, command_name) {
    var mockFile = path.join(state.baseDir, "mocks", command_name + ".json");
    var mockBody = JSON.stringify(JSON.parse(fs.readFileSync(mockFile)));
    this.printOutput(state, null, {statusCode: 200}, mockBody);
  },
  handleMockApiCall: function (state, command_name) {
    var mockFile = path.join(state.baseDir, "mocks", command_name + ".json");
    var mockJson = JSON.parse(fs.readFileSync(mockFile));
    mockJson["MOCK-DATA"] = true;
    var mockBody = JSON.stringify(mockJson);
    state.callback(mockBody);
  },
  printOutput: function (state, err, resp, body) {
    var wrappedResult = {};

    if (err) {
      wrappedResult.status = "FAILURE";
      wrappedResult.body = err;
      console.log(wrappedResult);
      return;
    }

    if (state.args.WRAP) {
      wrappedResult = {
        status: Math.floor(resp.statusCode/100) === 2 ? "SUCCESS" : "FAILURE",
        body: body
      };
      console.log(JSON.stringify(wrappedResult));
      return;
    }

    if (state.args.RAW) {
      console.log(body);
    } else if (state.args.JSON) {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } else {
      console.log(prettyjson.render(JSON.parse(body)));
    }
  }
};
