var clapiConfig = require("../api-call-configurations/include/clapi-config");

console.log("==== clapiConfig", clapiConfig);

var state = {
  headers: {}
};

var service = require("../api-call-configurations/include/service")(state);
service.setServiceEnv(clapiConfig.checkout.serviceEnv);
service.setConsumerUserId(clapiConfig.customer.cid);
service.setConsumerId(clapiConfig.checkout.consumerId);
service.setAuthSignature(clapiConfig.checkout.authSignature);

console.log("==== headers", service.getHeaders());