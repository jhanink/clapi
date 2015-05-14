module.exports = function (state) {
  var service = require("../include/service")(state);
  var customerId = state.args.customerId;
  if (!customerId) {
    console.log("---> missing customerId");return;
  }

  var isEmail = customerId.indexOf("@") > 0;

  var options = {
    url: 'http://ca.stg0.ca-services-cdc.prod.walmart.com/ca-app/services/customers/'
      + (isEmail?'emails/':'') + customerId,
    method: 'GET'
  };

  service.setServiceName("payment");
  service.sendRequest(options);
};
