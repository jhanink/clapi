module.exports = function (contents) {
  var self = {
    echo: function (other) {
      return other ? other : contents;
    },
    getCartItems: function () {
      return contents.items;
    },
    printCartItems: function () {
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
    },
    printFetchedItems: function () {
      var items = contents.result;
      var result = [];
      for (i=0;i<items.length;i++) {
        if (!items[i].canAddToCart || items[i].productClassType !== "REGULAR") continue;
        result.push ({
          "id": items[i].id,
          "offerId": items[i].offerId,
          "availability": items[i].offerFilfullmentOptionWrappers.split("#")[0],
          "fulfillmentOpts": items[i].offerFilfullmentOptionWrappers.split("#")[1]
        });
      }
      return result;
    }
  };
  return self;
};