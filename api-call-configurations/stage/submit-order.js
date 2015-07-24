var clapiConfig = require("../include/clapi-config");

module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.pcId) {
    console.log("---> missing pcId");return;
  }

  var options = {
    url: clapiConfig.checkout.purchaseContractEndpoint + state.args.pcId + '/submit',
    method: 'POST'
  };

  service.setTenantId(clapiConfig.general.tenantId);
  service.setVerticalId(clapiConfig.general.verticalId);
  service.setLocaleId(clapiConfig.general.localeId);

  service.setServiceName(clapiConfig.checkout.serviceName);
  service.setServiceVersion(clapiConfig.checkout.serviceVersion);
  service.setServiceEnv(clapiConfig.checkout.serviceEnv);
  service.setConsumerUserId(clapiConfig.customer.cid);
  service.setConsumerId(clapiConfig.checkout.consumerId);
  service.setAuthSignature(clapiConfig.checkout.authSignature);

  service.setKeyVersion(1);
  service.setCorrelationId("d1f0c0d2-2cf4-497b-b630-06d609d987b0");

  var payload = {"payload":null};
  service.setDataPayload(payload);

  // --- send request
  service.sendRequest(options);
};

