module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.pcId) {
    console.log("---> missing pcId");return;
  }

  // TODO - change to stage endpoint url
  var options = {
    url: 'http://ultra-esb.prod-xo.esb.platform.glb.prod.walmart.com/service/checkoutservice/checkout/contract/'
    + state.args.pcId,
    method: 'GET'
  };

  service.setServiceName("checkoutservice");
  service.setServiceVersion("2.0.0");

  // --- send request
  service.sendRequest(options);
};
