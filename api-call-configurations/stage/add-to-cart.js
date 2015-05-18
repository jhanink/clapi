module.exports = function (state) {
  var service = require("../include/service")(state);
  var cartId = state.args.cartId;
  var offerId = state.args.offerId;
  if (!cartId) {
    console.log("--> missing cartId");return;
  }
  if (!offerId) {
    console.log("--> missing offerId");return;
  }

  var options = {
    url: 'http://cartservice-app.stg1.pangeasvcscart.services.glb.prod.walmart.com/cart-service-app/cart/'
      + cartId + '/items',
    method: 'POST'
  };

  var data = {
    "offerId": offerId,
    "quantity": 1
  };

  service.setHeader("CRT", cartId);
  service.setServiceName("cartservice");
  service.sendRequest(options, data);
};