let alt         = require('../alt');
require('es6-promise').polyfill();
require('isomorphic-fetch');

class CustomerActions {
  updateCustomer(customer) {
    this.dispatch(customer);
  }
}

module.exports = alt.createActions(CustomerActions);