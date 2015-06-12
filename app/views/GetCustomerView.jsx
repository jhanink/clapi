let React     = require("react");
let Radium    = require("radium");

@Radium
class GetCustomerView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={[styles.base]}>
          Get Customer...
        </h2>
      </div>
    );
  }
}

let styles = {
  base: {
    color: '#CCC',
    textAlign: 'center'
  }
};

module.exports = GetCustomerView;