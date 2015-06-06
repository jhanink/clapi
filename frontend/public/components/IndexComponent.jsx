var IndexComponent = React.createClass({
  render: function() {
    var authors = this.props.data.map(function(item) {
      return (
          <div key={item.key}>
            <div>
              {item.author}
            </div>
          </div>
      );
    })

    return (
      <div>
        <h2>{this.props.name}</h2>
        <br/>
        {authors}
      </div>
    );
  }
});
