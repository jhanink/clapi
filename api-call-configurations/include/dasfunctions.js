module.exports = function (contents) {
  var self = {
    echo: function (other) {
      return other ? other : contents;
    },
    getCartItems: function () {
      return contents.items;
    },
    listCartItems: function () {
      var items = self.getCartItems();
      var result = [];
      for (i=0;i<items.length;i++) {
        result.push ({
          "name": items[i].name,
          "id": items[i].id,
          "offerId": items[i].offerId,
          "USItemId": items[i].USItemId,
          "quantity": items[i].quantity
        });
      }
      return result;
    }
  };
  return self;
};