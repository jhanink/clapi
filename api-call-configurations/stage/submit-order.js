var clapiConfig = require("../include/clapi-config");

module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.pcId) {
    console.log("---> missing pcId");return;
  }

  var options = {
    url: 'http://xoservice-app.stg1.pangaeasvcsxo.services.prod.walmart.com/checkoutservice/v1/purchasecontracts/'
      + state.args.pcId + '/submit',
    method: 'POST'
  };

  service.setServiceName("checkoutservice");
  service.setServiceVersion("1.0.0");

  service.setTenantId("0");
  service.setVerticalId("8");
  service.setLocaleId("eng_USA");

  service.setServiceEnv("stg1");
  service.setConsumerUserId(clapiConfig.customer.cid);
  service.setConsumerId("b2d8d5fd-db75-4b2f-8b98-3a417b4c1d10");
  service.setAuthSignature("EGHKfpuQzEz4cABRyQ/8byPVHVIzI9VqXDX4tvuEGEnmJkT1flIYTCnx1m0RDCihridZ0zf+9xxU9r3xnbLgKHe2yTiFRFRIHa1XiUOaQ8ry2JoOF4sQrD9PcwjiqqHGvL2aaD/jUV4xLQ+fajIM2+AW57BQRuDyZA9Y+llMB2E=");
  service.setKeyVersion(1);
  service.setCorrelationId("d1f0c0d2-2cf4-497b-b630-06d609d987b0");

  var payload = {"payload":null};
  service.setDataPayload(payload);

  // --- send request
  service.sendRequest(options);
};

