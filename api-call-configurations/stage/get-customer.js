var service = require("../include/service");

var args = process.state.args;
var customerId = args.customerId;

module.exports = function () {

  if (!customerId) {
    console.log("---> missing customerId");
    return;
  }

  // --- prepare configs
  var requestOptions = {
    hostname: 'ca.stg0.ca-services-cdc.prod.walmart.com',
    port: 80,
    path: '/ca-app/services/customers/' + customerId,
    method: 'GET'
  };

  // --- prepare request
  service.setServiceName("payment");
  service.setRequestOptions(requestOptions);
  service.setUseHttp();

  // --- send request
  service.sendRequest();

};