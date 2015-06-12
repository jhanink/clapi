let React     = require("react");
let Radium    = require("radium");

@Radium
class HomeView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={[styles.base]}>
          Those crazy squirrels are nuts!
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

module.exports = HomeView;