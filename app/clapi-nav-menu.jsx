import  React                 from 'react';
let     Router                = require('react-router');
let     $                     = require("jquery");
let     mui                   = require("material-ui");

let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;
let {Colors, Spacing, Typography} = mui.Styles;
import ThemeManager from 'material-ui/lib/styles/theme-manager';

let menuItems = [
  {text: 'get-customer', route: 'get-customer'},
  {text: 'create-cart', route: 'create-cart'},
  {text: 'add-to-cart', route: 'add-to-cart'},
  {text: 'create-gift-card', route: 'create-gift-card'},
  {text: 'get-iro-offers', route: 'get-iro-offers'},
  {text: 'get-receipt', route: 'get-receipt'},
  {text: 'get-purchase-contract', route: 'get-purchase-contract'}
];

module.exports = React.createClass({
  render() {
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
  _toggle() {
    this.refs.leftNav.toggle();
  },
  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
    this.refs.leftNav.close()
  },
  _onHeaderClick() {
    this.context.router.transitionTo("/");
    this.refs.leftNav.close();
  },
  getChildContext() {
  },
  contextTypes : {
    router: React.PropTypes.func
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getStyles() {
    return {
      cursor: 'pointer',
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }
});
