let React     = require("react");
let $         = require("jquery");
let Inspector = require("react-json-inspector");
let mui       = require("material-ui");

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let TextField = mui.TextField;

let GetCustomerView = React.createClass({
  getInitialState() {
    return {
      data: {}
    }
  },

  render() {
    return (
      <div style={{marginLeft: '25px'}}>
        <div style={{font:'20px Helvetica', color:'#888', marginTop:'20px', textAlign:'center'}}>
          GET CUSTOMER
        </div>
        <TextField
          ref="tf"
          style={{width: '100%', marginBottom: '40px'}}
          hintText="Customer Id"
          floatingLabelText="Enter a customer id"
          onChange={(e)=>{this.refs.tf.setValue(e.target.value.trim())}}
          onEnterKeyDown={this._handleInput}/>
        <Inspector data={this.state.data}/>
      </div>
    );
  },
  _handleInput(e) {
    var val = e.target.value;
    if (val.length === 36
        || (val.indexOf("@")>0 && val.indexOf(".")<val.length-1)) {
      this._getCustomer(val);
    }
  },
  _getCustomer(input) {
    var self = this;
    $.get("/get-customer/"+input, function(result) {
      self.setState({
        data: JSON.parse(result)
      });
    });
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

module.exports = GetCustomerView;