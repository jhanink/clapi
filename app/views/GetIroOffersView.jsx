let React     = require("react");
let Radium    = require("radium");
let Color     = require("color");


@Radium
class GetIroOffersView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={[styles.base]}>
          Get IRO Offers...
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

module.exports = GetIroOffersView;