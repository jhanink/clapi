let React     = require("react");
let $         = require("jquery");

let GetCustomerView = React.createClass({

  getInitialState() {
    return {
      data: {}
    }
  },

  componentDidMount() {
    var self = this;
    console.log("making /get-customer call")
    $.get("/get-customer", function(result) {
      self.setState({
        data: result
      })
    });
  },

  render() {
    return (
      <div>
        <h2 style={this.styles}>
          {this.state.data}
        </h2>
      </div>
    );
  },
  styles: {
    color: '#CCC',
    textAlign: 'center'
  }
});

module.exports = GetCustomerView;