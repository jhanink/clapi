var fs = require("fs");
var path = require("path");

module.exports = function (state) {
  var cid = state.args.cid;
  if (!cid) {
    console.log("---> missing cid");
    return;
  }
  var userHome = process.env['HOME'];
  var clapiUserConfigFilePath = path.join(userHome, "/clapi-config-override.json");
  var data = {
    customer: {
      cid: cid
    }
  };

  fs.writeFileSync(clapiUserConfigFilePath, JSON.stringify(data));
};

