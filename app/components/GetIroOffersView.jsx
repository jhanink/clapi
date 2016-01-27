let React     = require("react");
let $         = require("jquery");
let Inspector = require("react-json-inspector");
let mui       = require("material-ui");

import ThemeManager from 'material-ui/lib/styles/theme-manager';

let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let LinearProgress = mui.LinearProgress;
let LinearProgressTag = undefined;

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
          GET IRO OFFERS
        </div>
        <TextField
          ref="tfId"
          style={{width: '100%'}}
          hintText="OfferId / USItemId"
          floatingLabelText="Enter an OfferId or US-ItemId"
          onChange={(e)=>{this.refs.tfId.setValue(e.target.value.trim())}}
          onEnterKeyDown={this._handleInput}/>

        <TextField
            ref="tfUPC"
            style={{width: '100%'}}
            hintText="UPC"
            floatingLabelText="Enter a UPC"
            onChange={(e)=>{this.refs.tfUpc.setValue(e.target.value.trim())}}
            onEnterKeyDown={this._handleInput}/>

        <TextField
            ref="tfWUPC"
            style={{width: '100%'}}
            hintText="WUPC"
            floatingLabelText="Enter a WUPC"
            onChange={(e)=>{this.refs.tfWUPC.setValue(e.target.value.trim())}}
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
    let val = e.target.value;
    if (val.length > 0) {
      this._fetch(val)
    }
  },
  _fetch(type, input) {
    this.setState({isFetching: true});
    var self = this;
    $.get("/get-iro-offers/"+type+"/"+input, function(result) {
      setTimeout(function() {
        self.setState({
          isFetching: false,
          data: JSON.parse(result)
        });
      }, 1500);
    });
  },
  _handleClick() {
    let id = this.refs.tfId.getValue();
    let upc = this.refs.tfUPC.getValue();
    let wupc = this.refs.tfWUPC.getValue();
    if (id.length > 0) {
      this._fetch("id", id);
    } else if (upc.length > 0) {
      this._fetch("upc", upc);
    } else if (wupc.length > 0) {
      this._fetch("wupc", wupc);
    }
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
  }
});
