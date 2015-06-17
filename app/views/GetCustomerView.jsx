let React     = require("react");
let $         = require("jquery");
var Inspector = require('react-json-inspector');
var inspector = React.createFactory(Inspector);
var InteractiveSelection = require('../lib/interactive-selection');
var interactiveSelection = React.createFactory(InteractiveSelection);

let GetCustomerView = React.createClass({

  getInitialState() {
    return {
      data: {}
    }
  },

  componentDidMount() {
    var self = this;
    console.log("making /get-customer call");
    $.get("/get-customer", function(result) {
      self.setState({
        data: JSON.parse(result)
      });
    });
  },

  render() {
    return (
      <div>
        <h2 style={this.styles} ref="json">
          Get Customer...
        </h2>
        <Inspector data={this.state.data} interactiveLabel={interactiveSelection}/>
      </div>
    );
  },
  styles: {
    color: '#CCC',
    textAlign: 'center'
  }
});

module.exports = GetCustomerView;