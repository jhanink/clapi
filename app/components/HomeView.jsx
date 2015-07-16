let React     = require("react");

let styles = {color: '#999', textAlign: 'center', font: '50px Optima '};

class HomeView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={styles}>
          Welcome to CLAPI UI
          <p style={{font: '30px Optima'}}>
          click the hamburger to get started
          </p>

          <div style={{display:'inline-block',border:'3px solid orange',padding:'20px',margin:'50px 150px',borderRadius:'25px'}}>
            <img src="/images/clapi-ui.gif" width="60%" height="50%"/>
          </div>
        </h2>
      </div>
    );
  }
}

module.exports = HomeView;