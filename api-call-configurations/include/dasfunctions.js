module.exports = function (contents) {
  var self = {
    echo: function (other) {
      return other ? other : contents;
    },
    getCartItems: function () {
      return contents.items;
    }
  };
  return self;
};