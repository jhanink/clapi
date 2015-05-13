var service = require("../include/service");
var customerId = process.state.args.customerId;


module.exports = function () {
  if (!customerId) {
    console.log("---> missing customerId");return;
  }

  var options = {
    url: 'http://ca.stg0.ca-services-cdc.prod.walmart.com/ca-app/services/customers/' + customerId,
    method: 'GET'
  };

  service.setServiceName("payment");
  service.sendRequest(options);
};