let React           = require("react");
let $               = require("jquery");
let Inspector       = require("react-json-inspector");
let mui             = require("material-ui");
let CustomerStore   = require("../stores/CustomerStore");
let CustomerActions = require("../actions/CustomerActions");

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;

let LinearProgress = mui.LinearProgress;
var LinearProgressTag = undefined;

module.exports = React.createClass({
  getInitialState() {
    return {
      data: undefined,
      customerData: CustomerStore.getState().data,
      isFetching: false
    }
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  onChange(state) {
    this.setState({customer: state});
  },

  render() {
    return (
      <div style={{marginLeft: '25px'}}>
        <div style={{font:'20px Helvetica', color:'#888', marginTop:'20px', textAlign:'center'}}>
          GET CUSTOMER<br/>
        </div>
        <TextField
          ref="tf"
          style={{width: '100%'}}
          hintText="Customer Id or Email"
          floatingLabelText="Enter a customer id or email address"
          onChange={(e)=>{this.refs.tf.setValue(e.target.value.trim())}}
          onEnterKeyDown={this._handleInput}/>
        {
          this.state.isFetching
              ? <LinearProgress
              mode="indeterminate"
              style={{height:'4px', marginBottom: '10px', backgroundColor:'white'}}/>
              : <div style={{height:'4px', marginBottom: '10px'}}></div>
        }
        <RaisedButton
          label="fetch"
          primary={true}
          onClick={this._handleClick}
          style={{marginBottom: '30px'}}/>
        {
          this.state.data
              ? <Inspector data={this.state.data} filterOptions={{ignoreCase:true}}/>
              : <div></div>
        }
      </div>
    );
  },
  _handleInput(e) {
    var val = e.target.value;
    if (val.length === 36
        || (val.indexOf("@")>0 && val.indexOf(".")<val.length-1)) {
      this._fetch(val);
    }
  },
  _fetch(input) {
    this.setState({isFetching: true});
    var self = this;
    $.get("/get-customer/"+input, function(result) {
      setTimeout(function() {
        self.setState({
          isFetching: false,
          data: JSON.parse(result)
        });
      }, 1500);
    });
  },
  _handleClick() {
    let val = this.refs.tf.getValue();
    if (val.length > 0) {
      this._fetch(val);
    }
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
