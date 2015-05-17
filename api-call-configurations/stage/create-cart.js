module.exports = function (state) {
  var service = require("../include/service")(state);
  var customerId = state.args.customerId;

  if (!customerId) {
    console.log("---> missing customerId");return;
  }

  var options = {
    url: 'http://cartservice-app.stg1.pangeasvcscart.services.glb.prod.walmart.com/cart-service-app/cart',
    method: 'POST'
  };

  var data = {
    "location": {
      "postalCode": "94066",
      "state": "CA",
      "city": "San Bruno",
      "country": "USA"
    },
    "storeIds": [2280, 5457],
    "customerId": customerId,
    "currencyCode": "USD",
    "customerType": "CUSTOMER"
  };

  service.setServiceName("cartservice");
  service.sendRequest(options, data);
};
