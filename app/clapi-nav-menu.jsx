import React from 'react';
let Router = require('react-router');

let mui = require("material-ui");
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;

let {Colors, Spacing, Typography} = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

let menuItems = [
  {text: 'GET customer', route: 'get-customer'},
  {text: 'CREATE cart', route: 'create-cart'},
  {text: 'CREATE gift card', route: 'create-gift-card'},
  {text: 'CREATE temp card', route: 'create-temp-card'},
  {text: 'FETCH inventory report', route: 'fetch-inventory-report'},
  {text: 'GET IRO Offers', route: 'get-iro-offers'}
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
  render: function() {
    var header = (
        <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
          clapi commands
        </div>
    );
    return (
      <LeftNav
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          header={header}
          menuItems={menuItems}
          onChange={this._onLeftNavChange} />
    );
  },
  _toggle: function() {
    this.refs.leftNav.toggle();
  },
  _onLeftNavChange: function(e, key, payload) {
    this.context.router.transitionTo(payload.route);
    this.refs.leftNav.close()
  },
  _onHeaderClick: function () {
    this.refs.leftNav.close();
  },
  getStyles: function() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  },
  contextTypes : {
    router: React.PropTypes.func
  }
});
