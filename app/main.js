
import React from 'react';
var Router = require('react-router');

import $ from 'jquery';

var AppRoutes = require('./app-routes.jsx');


$(document).ready(function () {
  Router
    // Runs the router, similiar to the Router.run method. You can think of it as an
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

