//import React from 'react';
var React = require("react");

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var mui = require("material-ui");
var AppBar = mui.AppBar;
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
var SvgIcon = mui.SvgIcon;

var LeftNav = mui.LeftNav;

var menuItems = [
  {text: 'Something tasty'},
  {text: 'Somewhere far away'},
  {text: 'A long time ago...'}
]

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
        <LeftNav menuItems={menuItems} docked={false} ref="leftNav"/>
        <AppBar
            title="CLAPI - using React + Material Design"
            onLeftIconButtonTouchTap={this._onTapMenu}/>

        <h1>Those crazy squirrels are nuts!!</h1>
      </div>
    );
  },

  _onTapMenu: function() {
    console.log("tapped...")
    this.refs.leftNav.toggle();
  }
});

