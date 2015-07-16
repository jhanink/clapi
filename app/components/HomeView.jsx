let React     = require("react");

let styles = {color: '#999', textAlign: 'center', font: '30px Optima '};

class HomeView extends React.Component {
  render() {
    return (
      <div>
        <h2 style={styles}>
          Welcome to CLAPI UI
          <p style={{font: '20px Optima'}}>
          click the hamburger to get started
          </p>

          <div style={{display:'inline-block',border:'3px solid orange',padding:'20px',margin:'10px 150px',borderRadius:'25px'}}>
            <img src="/images/clapi-ui.gif" width="60%" height="50%"/>
          </div>

          <div style={{position:'fixed',bottom:'0', font:'15px Optima', height:'30px',backgroundColor:'black', width:'100%', paddingTop:'10px'}}>
            <a href="https://gecgithub01.walmart.com/jhanink/clapi" style={{color:'white', textAlign:'center', textDecoration:'none'}}>
              https://gecgithub01.walmart.com/jhanink/clapi
            </a>
          </div>
        </h2>
      </div>
    );
  }
}

module.exports = HomeView;