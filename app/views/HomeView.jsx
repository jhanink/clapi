let React     = require("react");

let styles = {color: '#CCC', textAlign: 'center'};

class HomeView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={styles}>
          Those crazy squirrels are nuts!
        </h2>
      </div>
    );
  }
}

module.exports = HomeView;