import  React                 from 'react';
let     Router                = require('react-router');
let     $                     = require("jquery");
let     mui                   = require("material-ui");
let     injectTapEventPlugin  = require("react-tap-event-plugin");

let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;
let {Colors, Spacing, Typography} = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
injectTapEventPlugin();

let menuItems = [
  {text: 'Get customer', route: 'get-customer'},
  {text: 'Create cart', route: 'create-cart'},
  {text: 'Create gift card', route: 'create-gift-card'},
  {text: 'Create temp card', route: 'create-temp-card'},
  {text: 'Fetch inventory report', route: 'fetch-inventory-report'},
  {text: 'Get IRO offers', route: 'get-iro-offers'}
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
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
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
