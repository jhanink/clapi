let express = require('express');
let router = express.Router();
let ApiCall = require('../api-call-configurations/stage');

// ----------------------------
// get customer
// ----------------------------
router.get('/get-customer/:customerId', (req, res) => {
  let config = {
    args: {
      name: 'get-customer',
      customerId: req.params.customerId
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});


// ----------------------------
// get iro offers
// ----------------------------
router.get('/get-iro-offers/:offerId', (req, res) => {
  let config = {
    args: {
      name: 'get-iro-offers',
      id: req.params.offerId
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

// ----------------------------
// create gift card
// ----------------------------
router.get('/create-gift-card/:amount', (req, res) => {
  let config = {
    args: {
      name: 'create-gift-card',
      amount: req.params.amount
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

// ----------------------------
// create cart
// ----------------------------
router.get('/create-cart/:customerId', (req, res) => {
  let config = {
    args: {
      name: 'create-cart',
      customerId: req.params.customerId
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

// ----------------------------
// add to cart
// ----------------------------
router.get('/add-to-cart/:cartId/:id', (req, res) => {
  let config = {
    args: {
      name: 'add-to-cart',
      cartId: req.params.cartId,
      id: req.params.id // can be offerId or USItemId
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});


// ----------------------------
// Isomorphic SSR for routes
// ----------------------------
router.get('*', (req, res) => {
  let React = require('react');
  let Router = require('react-router');
  let Routes = require("../app/clapi-routes.jsx");

  Router.run(Routes, req.path, (Handler) => {
    var html = React.renderToString(<Handler/>);
    return res.render('index.ejs', {html:html});
  })
});

module.exports = router;
