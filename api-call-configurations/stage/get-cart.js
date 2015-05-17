module.exports = function (state) {
  var service = require("../include/service")(state);
  var cartId = state.args.cartId;

  if (!cartId) {
    console.log("---> missing cartId");return;
  }

  var options = {
    url: 'http://cartservice-app.stg1.pangeasvcscart.services.glb.prod.walmart.com/cart-service-app/cart/' + cartId,
    method: 'GET'
  };

  service.setServiceName("cartservice");
  service.sendRequest(options);
};
