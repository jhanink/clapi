import  React       from 'react';
import  $           from 'jquery';
let     Router      = require('react-router');
let     AppRoutes   = require('./clapi-routes.jsx');

$(document).ready(function () {
  Router
    .create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    })
    .run(function (Handler) {
      React.render(<Handler />, document.body);
    });
});
