let React = require("react");
let mui = require("material-ui");

let AppBar = mui.AppBar;
let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let ClapiNavMenu = require("./clapi-nav-menu.jsx");

let injectTapEventPlugin = require("react-tap-event-plugin");
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
  render: function() {
    return (
      <div>
        <ClapiNavMenu ref="leftNavMenu"/>
        <AppBar title="CLAPI - using react, material design, and webpack" onLeftIconButtonTouchTap={this._onTapMenu}/>
        <div id="contentContainer">
          <h1>Those crazy squirrels are nuts!</h1>
        </div>
      </div>
    );
  },
  _onTapMenu: function() {
    this.refs.leftNavMenu._toggle();
  }
});

