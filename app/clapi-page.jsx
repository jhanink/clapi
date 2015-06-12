let React         = require("react");
let Router        = require("react-router");
let ClapiHeader   = require("./clapi-header.jsx");

let RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  render () {
    return (
      <div>
        <ClapiHeader/>
        <RouteHandler/>
      </div>
    );
  }
});

