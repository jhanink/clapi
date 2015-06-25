let alt = require("../alt");
let CustomerActions = require("../actions/CustomerActions");

class CustomerStore {
  constructor() {
    this.customer = {};
    this.bindListeners({
      handleUpdateCustomer: CustomerActions.UPDATE_CUSTOMER
    });
  }

  handleUpdateCustomer(customer) {
    this.customer = customer;
    return false; // suppress change customer event
  }
}

module.exports = alt.createStore(CustomerStore, 'CustomerStore');