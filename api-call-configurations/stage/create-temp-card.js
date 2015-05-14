var fs = require("fs");

module.exports = function (state) {
  var service = require("../include/service")(state);
  if (!state.args.file) {
    console.log("--> missing file");return;
  }

  var customer = JSON.parse(fs.readFileSync(state.args.file, 'utf8'));
  var customerId = customer.payload.person.customerAccountId;
  var preferenceId = customer.payload.person.accounts[0].paymentPreferences[0].preferenceId;

  var options = {
    url: 'http://ca.stg0.ca-services-cdc.prod.walmart.com/ca-app/services/customers/'
      + customerId + '/preferences/paymentpreferences/' + preferenceId + '/istemp/true',
    method: 'PUT'
  };

  service.setServiceName("payment");
  service.sendRequest(options);

};
