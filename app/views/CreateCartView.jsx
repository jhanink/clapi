let React     = require("react");
let Radium    = require("radium");

@Radium
class CreateCartView extends React.Component {
  render() {
    return (
      <div style={ {marginLeft: '25px'} }>
        <div style={{font:'25px Helvetica', color:'#888', marginTop:'20px', textAlign:'center'}}>
          Create Cart
        </div>
      </div>
    );
  }
}

module.exports = CreateCartView;