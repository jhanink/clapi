let React                 = require("react");
let SampleCheckboxView    = require("./samples/SampleCheckboxView.jsx");
let SampleTextFieldView   = require("./samples/SampleFloatingLabelView.jsx");
let SampleToggleView      = require("./samples/SampleToggleView.jsx");

module.exports = React.createClass({
  render() {
    return (
      <div>
        <SampleCheckboxView />
        <SampleToggleView/>
        <SampleTextFieldView/>
      </div>
    )
  }
});