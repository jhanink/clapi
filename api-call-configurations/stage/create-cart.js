module.exports = function (state) {
  var service = require("../include/service")(state);

  var customerId = state.args.customerId;

  var options = {
    url: 'http://cart-service-app.stg.cartserviceapp.globalproducts.glb.prod.walmart.com/cart-service-app/cart',
    method: 'POST'
  };

  var data = {
    "location": {"postalCode": "94066"},
    "storeIds": [2280, 5457],
    "customerId": customerId
  };

  service.setServiceName("cartservice");
  //service.sendRequest(options, data);
};
