var express = require('express');
var router = express.Router();
var ApiCall = require('../api-call-configurations/stage');

// get customer
router.get('/get-customer/:customerId', function(req, res) {
  var config = {
    args: {
      name: 'get-customer',
      customerId: req.params.customerId
    },
    callback: function (customer) {
      res.send(customer);
    }
  };

  ApiCall(config);
});


/* test */
router.get('/hello', function(req, res) {
  res.send("hello")
});


module.exports = router;