let React     = require("react");
let mui       = require("material-ui");

import ThemeManager from 'material-ui/lib/styles/theme-manager';

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
          label="Double Awesome Design Checkbox !"
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
  },
  styles: {
    base: {
      marginTop: '25px',
      marginLeft: '50px'
    }
  }

});
