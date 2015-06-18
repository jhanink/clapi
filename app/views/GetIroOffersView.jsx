let React     = require("react");
let $         = require("jquery");
let Inspector = require("react-json-inspector");
let mui       = require("material-ui");

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let TextField = mui.TextField;

let GetIroOffersView = React.createClass({
  getInitialState() {
    return {
      data: {}
    }
  },

  render() {
    return (
        <div style={ {marginLeft: '25px'} }>
          <div style={{font:'25px Helvetica', color:'#888', marginTop:'20px', textAlign:'center'}}>
            Get IRO Offers
          </div>
          <TextField
              ref="tf"
              style={{width: '350px', marginBottom: '40px'}}
              hintText="OfferId / USItemId"
              floatingLabelText="Enter an OfferId or USItemId"
              onChange={(e)=>{this.refs.tf.setValue(e.target.value.trim())}}
              onEnterKeyDown={this._handleInput}/>
          <Inspector data={this.state.data}/>
        </div>
    );
  },
  _handleInput(e) {
    let val = e.target.value;
    if (val.length > 0) {
      this._getIroOffers(val);
    }
  },
  _getIroOffers(input) {
    var self = this;
    $.get("/get-iro-offers/"+input, function(result) {
      self.setState({
        data: JSON.parse(result)
      });
    });
  },
  styles: {
    color: '#CCC',
    textAlign: 'center'
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

module.exports = GetIroOffersView;