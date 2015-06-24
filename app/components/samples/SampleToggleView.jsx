let React     = require("react");
let mui       = require("material-ui");

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let Toggle = mui.Toggle;

module.exports = React.createClass({
  style: {marginTop:'50px', marginLeft:'50px', width:'200px'},
  getInitialState : function() {
    return {
      textValue: ""
    };
  },
  render() {
    return (
      <div style={this.style}>
        <Toggle
          name="test"
          value="test1"
          label="activate thrusters"
          elementStyle={{width: '300px'}}/>
      </div>
    )
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
});
