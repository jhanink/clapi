let express   = require('express');
let ApiCall   = require('../api-call-configurations/stage');
let AltIso    = require('alt/utils/AltIso');
let alt      = require('../app/alt');
let Iso       = require('iso');

let React = require('react');
let Router = require('react-router');
let Routes = require("../app/clapi-routes.jsx");

let router  = express.Router();

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
// get receipt
// ----------------------------
router.get('/get-receipt/:transactionCode', (req, res) => {
  let config = {
    args: {
      name: 'get-receipt',
      transactionCode: req.params.transactionCode
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

// ----------------------------
// get purchase contract
// ----------------------------
router.get('/get-purchase-contract/:id', (req, res) => {
  let config = {
    args: {
      name: 'get-purchase-contract',
      pcId: req.params.id
    },
    callback (result) {
      res.send(result);
    }
  };

  ApiCall(config);
});

// -----------------------------------------------------
// get iro offers by id (offerId/USItemId), UPC, or WUPC
// -----------------------------------------------------
router.get('/get-iro-offers/:type/:value', (req, res) => {
  let config = {
    args: {
      name: 'get-iro-offers'
    },
    callback (result) {
      res.send(result);
    }
  };

  config.args[req.params.type] = req.params.value;

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

router.get('/get-customer', (req, res, next) => {
  // get data
  let config = {
    args: {
      name: 'get-customer',
      customerId: '688ddfc5-181f-46b5-a0e7-8dc139146253'
    },
    callback (result) {
      res.locals.data = result;
      next();
    }
  };

  ApiCall(config);

});


// ----------------------------
// Isomorphic SSR for routes
// ----------------------------
router.use( (req, res) => {
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  let iso = new Iso();
  Router.run(Routes, req.path, (Handler) => {
    var html = React.renderToStaticMarkup(<Handler/>);
    iso.add(html, alt.flush());
    res.render('index.ejs', {
      html: iso.render()
    });
  })
});

module.exports = router;
