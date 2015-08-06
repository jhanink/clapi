var prettyjson = require("prettyjson");
var stripAnsi = require("strip-ansi");
var Const = require("./clapi-constants");
var clapi = require("../clapi_modules/clapi-helpers");

module.exports = {
  getObjectPath: function (pathString, prop) {
    return pathString === "" ? prop : pathString + "." + prop;
  },
  matchProperty: function (searchTerm, pathString, prop, matches) {
    if (prop.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      var propertyPath = this.getObjectPath(pathString, prop);
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
      prefix.line = objInfo.IS_ARRAY?"array":objInfo.TYPE;
      prefix.padding = 8;
      prefix.length = prefix.line.length;
    }
    for (var _pad=0;_pad<(prefix.padding-prefix.length);_pad++) {prefix.line += " "}
    prefix.line = idx+(idx<10?"   ":"  ") + prefix.line;
    var str = Const.COLORS.DARK_GRAY + prefix.line + " "+ Const.COLORS.CLEAR ;

    if (objInfo.IS_VALUE_LEAF_NODE)
    {
      str += "" + Const.COLORS.BLUE + prop + Const.COLORS.CLEAR;
      str += Const.COLORS.LIGHT_GRAY +" — " + child + Const.COLORS.CLEAR;
    }
    else
    {
      var propCount = 0;
      if (objInfo.IS_PLAIN_OBJECT) {
        for (var _p in child) {if (child.hasOwnProperty(_p)) {propCount++;}}
      } else {
        propCount = child.length;
      }
      str += propCount ? Const.COLORS.BLUE : Const.COLORS.DARK_GRAY;
      var toPluralize = propCount === 0 || propCount > 1;
      str += (propCount?(objInfo.IS_ARRAY?"":""):"") + prop + "" + (propCount ? Const.COLORS.DARK_GRAY + " "+(objInfo.IS_ARRAY?"·":"·")+" "
          + propCount
          + (objInfo.IS_ARRAY?" element":" node")
          + (toPluralize?"s":"")
          + Const.COLORS.CLEAR : " \\");
      str += "\033[0m";
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