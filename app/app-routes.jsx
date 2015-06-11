let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;


let RootPage = require("./clapi-page.jsx");
let Placeholder = {};

let AppRoutes = (
    <Route name="root" path="/" handler={RootPage}>

      <Route name="get-customer" handler={Placeholder} />
      <Route name="create-cart" handler={Placeholder} />
      <Route name="create-gift-card" handler={Placeholder} />
      <Route name="create-temp-card" handler={Placeholder} />
      <Route name="fetch-inventory-report" handler={Placeholder} />
      <Route name="get-iro-offers" handler={Placeholder} />

      <DefaultRoute handler={RootPage}/>
    </Route>
);

module.exports = AppRoutes;