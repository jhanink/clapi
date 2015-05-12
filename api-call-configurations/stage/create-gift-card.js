var makeRequest = require("../include/make-request");

var args = process.state.args;
var amount = args.amount || 75;

var apiModule = function (headers){

  var data = {
    "clientreqid": "node" + Math.random(),
    "pmid": "FDCGC",
    "startbalance": {
      "currencyAmount": amount,
      "currencyUnit": "USD"
    }
  };

  var options = {
    hostname: 'stg-payment.glb.staging.walmart.com',
    port: 443,
    path: '/paymentservices/kuber/v1/paycards',
    method: 'PUT',
    headers: headers
  };

  // Set up the request
  makeRequest(options, data);
};

module.exports = apiModule;