//import React from 'react';
var React = require("react");
var mui = require("material-ui");
var AppBar = mui.AppBar;
var ThemeManager = new mui.Styles.ThemeManager();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return (
      <div>
        <AppBar title="CLAPI"/>
        <h1>Those crazy squirrels are nuts!!</h1>
      </div>
    );
  }
});

