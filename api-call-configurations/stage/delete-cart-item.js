module.exports = function (state) {
  var service = require("../include/service")(state);
  var cartId = state.args.cartId;
  var itemId = state.args.itemId;
  if (!cartId) {
    console.log("--> missing cartId");return;
  }
  if (!itemId) {
    console.log("--> missing itemId");return;
  }

  var options = {
    url: 'http://cartservice-app.stg1.pangeasvcscart.services.glb.prod.walmart.com/cart-service-app/cart/'
    + cartId + '/items/' + itemId,
    method: 'DELETE'
  };

  service.setHeader("CRT", cartId);
  service.setServiceName("cartservice");
  service.sendRequest(options);
};