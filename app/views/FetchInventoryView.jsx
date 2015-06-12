let React     = require("react");
let Radium    = require("radium");

@Radium
class FetchInventoryView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={[styles.base]}>
          Fetch Sample Inventory Report...
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

module.exports = FetchInventoryView;