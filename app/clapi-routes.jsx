let React     = require('react');
let Router    = require('react-router');

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let AppRoutes = (
  <Route name="root" path="/" location="history" handler={require("./clapi-page.jsx")}>
    <Route name="get-customer" handler={require("./components/GetCustomerView.jsx")} />
    <Route name="create-cart" handler={require("./components/CreateCartView.jsx")} />
    <Route name="add-to-cart" handler={require("./components/AddToCartView.jsx")} />
    <Route name="create-gift-card" handler={require("./components/CreateGiftCardView.jsx")} />
    <Route name="get-iro-offers" handler={require("./components/GetIroOffersView.jsx")} />
    <Route name="get-receipt" handler={require("./components/GetReceiptView.jsx")} />
    <Route name="get-purchase-contract" handler={require("./components/GetPurchaseContract.jsx")} />
    <Route name="samples-view" handler={require("./components/SamplesView.jsx")} />
    <DefaultRoute handler={require("./components/HomeView.jsx")} />
  </Route>
);

module.exports = AppRoutes;