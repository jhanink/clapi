let React                 = require("react");
let mui                   = require("material-ui");
let ClapiLeftNavMenu      = require("./clapi-nav-menu.jsx");

let AppBar = mui.AppBar;
import ThemeManager from 'material-ui/lib/styles/theme-manager';

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
    return "CLAPI";
  },
  _onTapMenu() {
    this.refs.leftNavMenu._toggle();
  },
  getChildContext() {
    
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  }
});

module.exports = ClapiHeader;