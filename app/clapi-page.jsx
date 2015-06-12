let React = require("react");
let Router = require("react-router");
let RouteHandler = Router.RouteHandler;

let mui = require("material-ui");
let AppBar = mui.AppBar;
let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
var SvgIcon = mui.SvgIcon;

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

let ClapiNavMenu = require("./clapi-nav-menu.jsx");

module.exports = React.createClass({
  render () {
    return (
      <div>
        <ClapiNavMenu ref="leftNavMenu"/>
        <AppBar title={this._getTitle()} onLeftIconButtonTouchTap={this._onTapMenu} />
        <RouteHandler/>
      </div>
    );
  },
  _getTitle() {
    return "CLAPI - using react, material design, and webpack";
  },
  _onTapMenu() {
    this.refs.leftNavMenu._toggle();
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  }
});

