let React     = require('react');
let Router    = require('react-router');

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let AppRoutes = (
    <Route name="root" path="/" location="history" handler={require("./clapi-page.jsx")}>
      <Route name="get-customer" handler={require("./views/GetCustomerView.jsx")} />
      <Route name="create-cart" handler={require("./views/CreateCartView.jsx")} />
      <Route name="add-to-cart" handler={require("./views/AddToCartView.jsx")} />
      <Route name="create-gift-card" handler={require("./views/CreateGiftCardView.jsx")} />
      <Route name="get-iro-offers" handler={require("./views/GetIroOffersView.jsx")} />
      <Route name="samples-view" handler={require("./views/SamplesView.jsx")} />
      <DefaultRoute handler={require("./views/HomeView.jsx")} />
    </Route>
);

module.exports = AppRoutes;