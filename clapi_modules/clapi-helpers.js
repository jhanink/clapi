var fs = require("fs");
var prettyjson = require("prettyjson");
var Util = require("./clapi-util");

module.exports =
{
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
