let React = require("react");
let Radium = require("radium");
let Color = require("color");

@Radium
class CreateCartView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={[styles.base]}>
          Create Cart...
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


module.exports = CreateCartView;