module.exports = function (state) {
  var service = require("../include/service")(state);
  var amount = state.args.amount || 75;
  var options = {
    url: 'https://stg-payment.glb.staging.walmart.com/paymentservices/kuber/v1/paycards',
    method: 'PUT'
  };

  var data = {
    "clientreqid": "node" + Math.random(),
    "pmid": "FDCGC",
    "startbalance": {
      "currencyAmount": amount,
      "currencyUnit": "USD"
    }
  };

  service.setServiceName("payment");
  service.sendRequest(options, data);
};
