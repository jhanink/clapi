var service = require("../include/service");

var args = process.state.args;
var pcId = args.pcId;

module.exports = function () {
  if (!pcId) {
    console.log("---> missing pcId");return;
  }

  var options = {
    url: 'http://ultra-esb.prod-xo.esb.platform.glb.prod.walmart.com/service/checkoutservice/checkout/contract/' + pcId,
    method: 'GET'
  };

  service.setServiceName("checkoutservice");
  service.setServiceVersion("2.0.0");

  // --- send request
  service.sendRequest(options);

};
