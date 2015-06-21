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

// ----------------------------
// create gift card
// ----------------------------
router.get('/create-gift-card/:amount', function(req, res) {
  var config = {
    args: {
      name: 'create-gift-card',
      amount: req.params.amount
    },
    callback: function (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

router.get('*', function(req, res) {
  var React = require('react');
  var Router = require('react-router');
  var Routes = require("../app/clapi-routes.jsx");

  Router.run(Routes, req.path, function(Handler) {
    var html = React.renderToString(<Handler/>);
    return res.render('index.ejs', {html:html});
  })
});


module.exports = router;