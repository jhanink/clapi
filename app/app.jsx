import  React       from 'react';
let     Router      = require('react-router');
let     AppRoutes   = require('./clapi-routes.jsx');

Router.run(AppRoutes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById("app"));
});

