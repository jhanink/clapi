let alt = require("../alt");
let CustomerActions = require("../actions/CustomerActions");

class CustomerStore {
  constructor() {
    this.data = {};
    this.bindListeners({
      updateCustomer: CustomerActions.updateCustomer
    });
  }

  updateCustomer(data) {
    this.data = data;
    return false; // suppress change customer event
  }
}

module.exports = alt.createStore(CustomerStore, 'CustomerStore');