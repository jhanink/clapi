var fs = require("fs");

var service = require("../include/service");
var args = process.state.args;
var file = args.file;

module.exports = function () {

  var customer = JSON.parse(fs.readFileSync(file, 'utf8'));

  var customerId = customer.payload.person.customerAccountId;
  var preferenceId = customer.payload.person.accounts[0].paymentPreferences[0].preferenceId;

  // --- prepare configs
  var requestOptions = {
    hostname: 'ca.stg0.ca-services-cdc.prod.walmart.com',
    port: 80,
    path: '/ca-app/services/customers/' + customerId + '/preferences/paymentpreferences/' + preferenceId + '/istemp/true',
    method: 'PUT'
  };

  // --- prepare request
  service.setServiceName("payment");
  service.setRequestOptions(requestOptions);
  service.setUseHttp();

  // --- send request
  service.sendRequest();

};