let React = require("react");
let mui = require("material-ui");
let Router = require("react-router");
let RouteHandler = Router.RouteHandler;

let AppBar = mui.AppBar;
let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let ClapiNavMenu = require("./clapi-nav-menu.jsx");

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

module.exports = React.createClass({
  render () {
    return (
      <div>
        <ClapiNavMenu ref="leftNavMenu"/>
        <AppBar title="CLAPI - using react, material design, and webpack" onLeftIconButtonTouchTap={this._onTapMenu}/>
        <RouteHandler/>
      </div>
    );
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

