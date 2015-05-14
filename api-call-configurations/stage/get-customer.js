module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.customerId) {
    console.log("---> missing customerId");return;
  }

  var options = {
    url: 'http://ca.stg0.ca-services-cdc.prod.walmart.com/ca-app/services/customers/' + state.args.customerId,
    method: 'GET'
  };

  service.setServiceName("payment");
  service.sendRequest(options);
};
