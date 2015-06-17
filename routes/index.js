var express = require('express');
var router = express.Router();
var ApiCall = require('../api-call-configurations/stage');

// get customer
router.get('/get-customer', function(req, res) {
  var config = {
    args: {
      name: 'get-customer',
      customerId: '688ddfc5-181f-46b5-a0e7-8dc139146253'
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