var express = require('express');
var router = express.Router();
var ApiCall = require('../api-call-configurations/stage');


// ----------------------------
// get customer
// ----------------------------
router.get('/get-customer/:customerId', function(req, res) {
  var config = {
    args: {
      name: 'get-customer',
      customerId: req.params.customerId
    },
    callback: function (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});


// ----------------------------
// get iro offers
// ----------------------------
router.get('/get-iro-offers/:offerId', function(req, res) {
  var config = {
    args: {
      name: 'get-iro-offers',
      id: req.params.offerId
    },
    callback: function (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});


/* test */
router.get('/hello', function(req, res) {
  res.send("hello")
});


module.exports = router;