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

// ----------------------------
// create cart
// ----------------------------
router.get('/create-cart/:customerId', function(req, res) {
  var config = {
    args: {
      name: 'create-cart',
      customerId: req.params.customerId
    },
    callback: function (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

// ----------------------------
// add to cart
// ----------------------------
router.get('/add-to-cart/:cartId/:id', function(req, res) {
  var config = {
    args: {
      name: 'add-to-cart',
      cartId: req.params.cartId,
      id: req.params.id // can be offerId or USItemId
    },
    callback: function (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});


// ----------------------------
// Isomorphic SSR for routes
// ----------------------------
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