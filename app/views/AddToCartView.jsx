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
            ADD TO CART
          </div>
          <TextField
              ref="tf"
              style={{width: '100%'}}
              hintText="Cart Id"
              floatingLabelText="Enter a cart id"
              onChange={(e)=>{this.refs.tf.setValue(e.target.value.trim())}}/>
          <br/>
          <TextField
              ref="tf2"
              style={{width: '100%'}}
              hintText="Offer Id"
              floatingLabelText="Enter an offer id"
              onChange={(e)=>{this.refs.tf2.setValue(e.target.value.trim())}}/>
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
          <Inspector data={this.state.data}/>
        </div>
    );
  },
  _fetch(cartId, offerId) {
    this.setState({isFetching: true});
    var self = this;
    $.get("/add-to-cart/"+cartId+"/"+offerId, function(result) {
      setTimeout(function() {
        self.setState({
          isFetching: false,
          data: JSON.parse(result)
        });
      }, 1500);
    });
  },
  _handleClick() {
    let cartId = this.refs.tf.getValue();
    let offerId = this.refs.tf2.getValue();
    if (cartId.length > 0 && offerId.length > 0) {
      this._fetch(cartId, offerId);
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
