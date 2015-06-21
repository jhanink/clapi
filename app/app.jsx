import  React       from 'react';
import  $           from 'jquery';
let     Router      = require('react-router');
let     AppRoutes   = require('./clapi-routes.jsx');

Router.run(AppRoutes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});

