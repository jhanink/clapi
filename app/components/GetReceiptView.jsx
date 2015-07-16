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
      data: undefined,
      isFetching: false
    }
  },

  render() {
    return (
        <div style={{marginLeft: '25px'}}>
          <div style={{font:'20px Helvetica', color:'#888', margin:'20px', textAlign:'center'}}>
            GET RECEIPT
          </div>
          <TextField
              ref="tf"
              style={{width: '100%'}}
              hintText="Receipt TC#"
              floatingLabelText="Enter a Receipt TC#"
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
                ? <Inspector data={this.state.data}/>
                : <div></div>
          }
        </div>
    );
  },
  _handleInput(e) {
    let val = e.target.value;
    if (val.length > 0) {
      this._fetch(val)
    }
  },
  _fetch(input) {
    this.setState({isFetching: true});
    var self = this;
    $.get("/get-receipt/"+input, function(result) {
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
