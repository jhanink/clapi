
import React from 'react';
import $ from 'jquery';

let Router = require('react-router');
let AppRoutes = require('./app-routes.jsx');


$(document).ready(function () {
  Router
    // Runs the router, similar to the Router.run method. You can think of it as an
    // initializer/constructor method.
    .create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    })
    // This is our callback function, whenever the url changes it will be called again.
    // Handler: The ReactComponent class that will be rendered
    .run(function (Handler) {
      React.render(<Handler />, document.body);
    });

});
