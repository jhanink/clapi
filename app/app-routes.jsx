var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;


var RootPage = require("./clapi-page.jsx");
var Placeholder = {};

var AppRoutes = (
    <Route name="root" path="/" handler={RootPage}>

      <Route name="get-customer" handler={Placeholder} />
      <Route name="create-customer" handler={Placeholder} />
      <Route name="create-gift-card" handler={Placeholder} />
      <Route name="create-temp-card" handler={Placeholder} />
      <Route name="fetch-inventory-report" handler={Placeholder} />
      <Route name="get-iro-offers" handler={Placeholder} />

      <DefaultRoute handler={RootPage}/>
    </Route>
);

module.exports = AppRoutes;