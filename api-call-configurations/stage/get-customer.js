var clapiConfig = require("../include/clapi-config");

module.exports = function (state) {
  var service = require("../include/service")(state);
  var customerId = state.args.customerId;
  if (!customerId) {
    console.log("---> missing customerId");return;
  }

  var isEmail = customerId.indexOf("@") > 0;

  var options = {
    url: clapiConfig.customer.caEndpoint + (isEmail?'emails/':'') + customerId,
    method: 'GET'
  };

  // todo: what is the right service name??
  service.setServiceName("payment");
  service.sendRequest(options);
};
