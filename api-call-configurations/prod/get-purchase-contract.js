var service = require("../include/service");

var args = process.state.args;
var pcId = args.pcId;

module.exports = function () {

  if (!pcId) {
    console.log("---> missing pcId");
    return;
  }

  // --- prepare configs
  var requestOptions = {
    hostname: 'ultra-esb.prod-xo.esb.platform.glb.prod.walmart.com',
    port: 80,
    path: '/service/checkoutservice/checkout/contract/' + pcId,
    method: 'GET'
  };

  // --- prepare request
  service.setServiceName("checkoutservice");
  service.setServiceVersion("2.0.0");
  service.setRequestOptions(requestOptions);
  service.setUseHttp();

  // --- send request
  service.sendRequest();

};
