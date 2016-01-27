let React     = require("react");
let mui       = require("material-ui");

import ThemeManager from 'material-ui/lib/styles/theme-manager';

let TextField = mui.TextField;

// https://github.com/callemall/material-ui/issues/835
module.exports = React.createClass({
  containerStyle: {marginTop:'0', marginLeft:'50px'},
  textFieldStyle: {},
  getInitialState : function() {
    return {
      textValue: ""
    };
  },
  render() {
    return (
      <div style={this.containerStyle}>
        <TextField
          hintText="Please enter your first name"
          floatingLabelText="First Name"
          style={this.textFieldStyle}/><br/>
        <TextField
          hintText="Please enter your middle name"
          floatingLabelText="Middle Name"
          style={this.textFieldStyle}/><br/>
        <TextField
          hintText="Please enter your last name"
          floatingLabelText="Last Name"
          style={this.textFieldStyle}/>
      </div>
    )
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
  }
});
