var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

React.render(
    <IndexComponent name="Clapi" data={data}/>, document.getElementById("container-main")
);
