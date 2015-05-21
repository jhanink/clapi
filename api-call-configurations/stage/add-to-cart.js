module.exports = function (state) {
  var service = require("../include/service")(state);
  var cartId = state.args.cartId;
  var id = state.args.id;

  if (!cartId) {
    console.log("--> missing cartId");return;
  }
  if (!id) {
    console.log("--> missing (item) id param");return;
  }

  var options = {
    url: 'http://cartservice-app.stg1.pangeasvcscart.services.glb.prod.walmart.com/cart-service-app/cart/'
      + cartId + '/items',
    method: 'POST'
  };

  var data = {
    "quantity": 1
  };

  if (id.length === 32) {
    data.offerId = id;
  } else {
    data.itemId = id;
  }

  service.setHeader("CRT", cartId);
  service.setServiceName("cartservice");
  service.sendRequest(options, data);
};
