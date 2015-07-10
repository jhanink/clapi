module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.pcId) {
    console.log("---> missing pcId");return;
  }

  var options = {
    url: 'http://xoservice-app.stg.pangaeasvcsxo.services.glb.prod.walmart.com/checkoutservice/v1/purchasecontracts/'
    + state.args.pcId,
    method: 'GET'
  };

  service.setServiceName("checkoutservice");
  service.setServiceVersion("1.0.0");
  service.setConsumerId("881f2838-7b97-49c3-a45e-1b36ceac7b9a");

  // --- send request
  service.sendRequest(options);
};
