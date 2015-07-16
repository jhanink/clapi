module.exports = function (state) {
  var service = require("../include/service")(state);
  var transactionCode = state.args.transactionCode;
  if (!transactionCode) {
    console.log("---> missing tc");return;
  } else {
    // hack - pass tc with a prefix, __26686011496922631859 to prevent it
    // from being interpreted as a number and truncated by 32-bit int size
    if (transactionCode.indexOf("__") === 0) {
      transactionCode = transactionCode.substring(2);
    }
  }

  var options = {
    url: 'http://receipts-mobile-stg0.glb.prod.walmart.com/business/WM/transaction/'+ transactionCode,
    method: 'GET'
  };

  service.setHeader("apiKey", "124A2BE7-60D0-48B2-86E1-F9F8139ABD6C");

  service.sendRequest(options);
};
