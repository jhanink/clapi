var service = require("../include/service");

var args = process.state.args;
var amount = args.amount || 75;

module.exports = function () {

  // --- prepare configs
  var requestOptions = {
    hostname: 'stg-payment.glb.staging.walmart.com',
    port: 443,
    path: '/paymentservices/kuber/v1/paycards',
    method: 'PUT'
  };

  var dataPayload = {
    "clientreqid": "node" + Math.random(),
    "pmid": "FDCGC",
    "startbalance": {
      "currencyAmount": amount,
      "currencyUnit": "USD"
    }
  };

  // --- prepare request
  service.setServiceName("payment");
  service.setServiceVersion("1.0.0");
  service.setRequestOptions(requestOptions);
  service.setDataPayload(dataPayload);

  // --- send request
  service.sendRequest();

};



/*
 curl -v \
 -X PUT -H "WM.SRV.DEVICEID:walmart.com" -H "WM.SRV.LOCALEID:eng_USA" -H "WM.SRV.TENANTID:0" \
 -H "WM_CONSUMER.ID:100" -H "WM_QOS.CORRELATION_ID:bfhyb" -H "WM_SEC.AUTH_TOKEN:ahha%&\!^\!)(\!&" \
 -H "WM_SVC.ENV:DEV" -H "WM_SVC.NAME:payment" -H "WM_SVC.VERSION:1.0.0" \
 -H "Accept:application/json" -H "Content-Type:application/json" \
 --data '{"clientreqid":"node00000000000000000000","pmid":"FDCGC","startbalance":{"currencyAmount":50,"currencyUnit":"USD"}}' \
 https://stg-payment.glb.staging.walmart.com/paymentservices/kuber/v1/paycards
 */