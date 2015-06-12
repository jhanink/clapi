let React                 = require("react");
let mui                   = require("material-ui");
let injectTapEventPlugin  = require("react-tap-event-plugin");
let ClapiLeftNavMenu      = require("./clapi-nav-menu.jsx");

let AppBar = mui.AppBar;
let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
injectTapEventPlugin();

let ClapiHeader = React.createClass({
  render() {
    return (
      <div>
        <ClapiLeftNavMenu ref="leftNavMenu"/>
        <AppBar title={this._getTitle()} onLeftIconButtonTouchTap={this._onTapMenu} />
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

module.exports = ClapiHeader;