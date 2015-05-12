var https = require("https");
var prettyjson = require("prettyjson");


var makeRequest = function (options, data) {

if (data) {
    data = JSON.stringify(data);
    options["Content-Length"] = data.length;
  console.log("--------------")
    console.log(data)
  console.log("--------------")
  }

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(prettyjson.render(responseString));
    });
  });

  req.on('error', function(e) {
    console.log(e);
  });

  if (data) {
    req.write(data);
  }
  req.end();

};

module.exports = makeRequest;


/*
 curl -v \
 -X PUT -H "WM.SRV.DEVICEID:walmart.com" -H "WM.SRV.LOCALEID:eng_USA" -H "WM.SRV.TENANTID:0" \
 -H "WM_CONSUMER.ID:100" -H "WM_QOS.CORRELATION_ID:bfhyb" -H "WM_SEC.AUTH_TOKEN:ahha%&\!^\!)(\!&" \
 -H "WM_SVC.ENV:DEV" -H "WM_SVC.NAME:payment" -H "WM_SVC.VERSION:1.0.0" \
 -H "Accept:application/json" -H "Content-Type:application/json" \
 --data '{"clientreqid":"node00000000000000000000","pmid":"FDCGC","startbalance":{"currencyAmount":50,"currencyUnit":"USD"}}' \
 https://stg-payment.glb.staging.walmart.com/paymentservices/kuber/v1/paycards
*/