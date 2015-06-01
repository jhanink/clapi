module.exports = function (val) {
  return {
    fulfillmentMissingPrices: function () {
      var test = val.test;
      var output = [];
      for (var i = 0; i < test.length; i++) {
        var key = "item-" + i;
        var obj = {}
        if (test[i].storefrontPricing) {
          obj[key] = "ok";
          output.push(obj);
        } else {
          obj[key] = "bad";
          output.push(obj);
        }
      }
      return output;
    }
  }
};