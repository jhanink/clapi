let React     = require("react");
let Radium    = require("radium");
let Color     = require("color");

@Radium
class CreateGiftCardView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={[styles.base]}>
          Create Walmart Gift Card...
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


module.exports = CreateGiftCardView;