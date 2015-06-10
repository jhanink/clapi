import React from 'react';

var mui = require("material-ui");
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;

var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var menuItems = [
  {
    text: 'GET customer',
    type: MenuItem.Types.LINK,
    payload: '#/get-customer'
  },
  {
    text: 'CREATE cart',
    type: MenuItem.Types.LINK,
    payload: '#/create-customer'
  },
  {
    text: 'CREATE gift card',
    type: MenuItem.Types.LINK,
    payload: '#/create-gift-card'
  },
  {
    text: 'CREATE temp card',
    type: MenuItem.Types.LINK,
    payload: '#/create-temp-card'
  },
  {
    text: 'FETCH inventory report',
    type: MenuItem.Types.LINK,
    payload: '#/fetch-inventory-report'
  },
  {
    text: 'GET IRO Offers',
    type: MenuItem.Types.LINK,
    payload: '#/get-iro-offers'
  }
];

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    return (
      <LeftNav menuItems={menuItems} docked={false} ref="leftNav"/>
    );
  },
  _toggle: function() {
    this.refs.leftNav.toggle();
  }
});
