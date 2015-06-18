let React     = require("react");
let $         = require("jquery");
let Inspector = require("react-json-inspector");
let mui       = require("material-ui");

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;

let LinearProgress = mui.LinearProgress;
var LinearProgressTag = undefined;

module.exports = React.createClass({
  getInitialState() {
    return {
      data: {},
      isFetching: false
    }
  },

  render() {
    return (
      <div style={{marginLeft: '25px'}}>
        <div style={{font:'20px Helvetica', color:'#888', marginTop:'20px', textAlign:'center'}}>
          CREATE GIFT CARD
        </div>
        <TextField
          ref="tf"
          style={{width: '100%'}}
          hintText="Amount"
          floatingLabelText="Enter a gift card amount"
          onChange={(e)=>{this.refs.tf.setValue(e.target.value.trim())}}
          onEnterKeyDown={this._handleInput}/>
        <RaisedButton
          label="fetch"
          primary={true}
          onClick={this._handleClick}
          style={{marginBottom: '30px'}}/>
        {
          this.state.isFetching
            ? <LinearProgress
                mode="indeterminate"
                style={{height:'2px', marginBottom: '20px'}}/>
            : null
        }
        <Inspector data={this.state.data}/>
      </div>
    );
  },
  _handleInput(e) {
    var val = e.target.value;
    if (val.length > 0) {
      this._fetch(val);
    }
  },
  _fetch(input) {
    this.setState({isFetching: true});
    var self = this;
    $.get("/create-gift-card/"+input, function(result) {
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
