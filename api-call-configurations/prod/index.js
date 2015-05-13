var fs = require("fs");
var path = require("path");

module.exports = function () {

  var stageHeaders = {
    "WM.SRV.DEVICEID": "walmart.com",
    "WM.SRV.LOCALEID": "eng_USA",
    "WM.SRV.TENANTID": 0,
    "WM_CONSUMER.ID": 100,
    "WM_QOS.CORRELATION_ID": "bfhyb",
    "WM_SEC.AUTH_TOKEN": "ahha%&!^!)(!&",
    "WM_SVC.ENV": "stage",
    "WM_SVC.VERSION": "1.0.0",
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  process.state.headers = stageHeaders;

  var args = process.state.args;
  var name = args.name;

  if (!name) {
    console.log("---> no name provided");
    return;
  }

  fs.stat(path.join(__dirname, name + ".js"), function (err, stats) {
    if (!err) {
      require("./" + name);
    } else {
      console.log("---> no such api config file for ["+name+"]");
    }
  });

};
