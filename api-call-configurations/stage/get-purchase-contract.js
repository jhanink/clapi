var clapiConfig = require("../include/clapi-config");

module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.pcId) {
    console.log("---> missing pcId");return;
  }

  var options = {
    url: clapiConfig.checkout.purchaseContractEndpoint + state.args.pcId,
    method: 'GET'
  };

  service.setTenantId(clapiConfig.general.tenantId);
  service.setVerticalId(clapiConfig.general.verticalId);
  service.setLocaleId(clapiConfig.general.localeId);
  service.setKeyVersion(clapiConfig.general.keyVersion);
  service.setCorrelationId(clapiConfig.general.correlationId);

  service.setServiceName(clapiConfig.checkout.serviceName);
  service.setServiceVersion(clapiConfig.checkout.serviceVersion);
  service.setServiceEnv(clapiConfig.checkout.serviceEnv);
  service.setConsumerUserId(clapiConfig.customer.cid);
  service.setConsumerId(clapiConfig.checkout.consumerId);
  service.setAuthSignature(clapiConfig.checkout.authSignature);

  service.setDataPayload("{\"payload\":null}");

  // --- send request
  service.sendRequest(options);
};
