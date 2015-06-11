var React = require("react");
var mui = require("material-ui");

var AppBar = mui.AppBar;
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var ClapiNavMenu = require("./clapi-nav-menu.jsx");

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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
        <ClapiNavMenu ref="lnm"/>
        <AppBar title="CLAPI - using react, webpack, and material design" onLeftIconButtonTouchTap={this._onTapMenu}/>
        <h1>Those crazy squirrels are nuts!!</h1>
      </div>
    );
  },
  _onTapMenu: function() {
    this.refs.lnm._toggle();
  }
});

