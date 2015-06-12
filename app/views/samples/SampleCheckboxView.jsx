let React = require("react");
let mui = require("material-ui");

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let Checkbox = mui.Checkbox;

module.exports = React.createClass({
  getInitialState : function() {
    return {
      checked: false
    };
  },
  render() {
    return (
      <div style={this.styles.base}>
        <Checkbox
          name="checkboxName1"
          value="checkboxValue1"
          label="Material Design Checkbox !"
          defaultChecked={this.state.checked}
          onCheck={this._onCheck}/>
      </div>
    )
  },
  _onCheck(e, checked) {
    this.state.checked = checked;
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  styles: {
    base: {
      margin: '50px 50px'
    }
  }

});
