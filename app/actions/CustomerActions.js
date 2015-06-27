let alt         = require('../alt');
require('es6-promise').polyfill();
require('isomorphic-fetch');

class CustomerActions {
  updateCustomer(customer) {
    this.dispatch(customer);
  }

  fetch() {
    return fetch('http://xkcd-imgs.herokuapp.com/')
      .then((response) => {
        return response.json()
      })
  };
}

module.exports = alt.createActions(CustomerActions);