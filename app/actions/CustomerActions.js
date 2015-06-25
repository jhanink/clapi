let alt = require("../alt");

class CustomerActions {
  updateCustomer(customer) {
    this.dispatch(customer);
  }
}

module.exports = alt.createActions(CustomerActions);